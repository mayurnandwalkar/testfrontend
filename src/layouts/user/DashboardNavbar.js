import { useState } from "react";
import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
// components
import Iconify from "../../components/Iconify";
//
import Searchbar from "./Searchbar";
import AccountPopover from "../artist/AccountPopover";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";

import genreInstance from "src/axios/genreInstance";
import useSWR from "swr";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      width: 600,
    },
  },
};

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const GenreMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "inline-flex",
  width: "33% !important",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedGenre(event.target.value);
    navigate(`/dashboard/tracks/genre/${event.target.value}`);
  };

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");

    return response.data.genres;
  };

  const { data: genres, error } = useSWR("fetch navbar genres", fetchGenres);

  if (error) return <div>failed to load</div>;

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {(location.pathname === "/dashboard/book" ||
          location.pathname === "/dashboard/solution") && (
          <Searchbar currentLocation={location.pathname} />
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1.5, sm: 1.5, md: 2.5, lg: 3.5, xl: 4.5 }}
        >
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Genre</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedGenre}
                label="Genre"
                onChange={handleChange}
                MenuProps={MenuProps}
                autoWidth
              >
                {genres?.map((genre) => (
                  <GenreMenuItem key={genre.slug} value={genre.slug}>
                    {genre.name}
                  </GenreMenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Cart />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

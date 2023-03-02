import { useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
// import Navbar from "./Navbar";
import {
  Grid,
  Container,
  Box,
  Link,
  Typography,
  Button,
  Drawer,
} from "@mui/material";
// ----------------------------------------------------------------------
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/system";

import { signOut } from "src/store/actions/authActions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardSidebar from "../user/DashboardSidebar";
import Scrollbar from "src/components/Scrollbar";
import Logo from "src/components/Logo";
import NavSection from "src/components/NavSection";
import Iconify from "src/components/Iconify";
import MenuIcon from "@mui/icons-material/Menu";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navbarItems = [
  {
    title: "Overview",
    path: "/artist",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "About",
    path: "/artist/about",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Albums",
    path: "/artist/albums",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Tracks",
    path: "/artist/tracks",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Settings",
    path: "/artist/settings",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Payment",
    path: "/artist/payment",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
];

const APP_BAR_MOBILE = 24;
const APP_BAR_DESKTOP = 36;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  flexDirection: "column",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const ArtistLanding = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <NavSection navConfig={navbarItems} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const openSidebar = () => {
    setIsOpenSidebar(true);
  };
  return (
    <Box
      style={{
        position: "relative",
        width: "100vw",
        height: isMobile ? "25vh" : "35vh",
      }}
    >
      <img
        src={user.artistBannerImage}
        style={{ width: "100%", height: "100%", objectFit: "cover " }}
        alt="artist"
      />
      <Stack
        direction="row"
        spacing={{
          xs: 1,
          sm: 2,
          md: 4,
        }}
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: isMobile ? "4rem" : "5rem",

          left: isMobile ? "1rem" : "5rem",
        }}
      >
        <img
          src={user.artistProfilePicture}
          style={{
            width: isMobile ? "6rem" : "9rem",
            height: isMobile ? "6rem" : "9rem",

            borderRadius: "50%",
          }}
          alt="artist"
        />
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: isMobile ? "2rem" : "3rem",
          }}
        >
          {user.firstName} {user.lastName}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        style={{
          position: "absolute",
          top: isMobile ? "1rem" : "5rem",
          right: isMobile ? "1rem" : "5rem",
        }}
        onClick={() => {
          dispatch(signOut());
        }}
      >
        Logout
      </Button>

      <NavbarContainer isMobile={isMobile} openSidebar={openSidebar} />

      <Drawer
        open={isOpenSidebar}
        onClose={() => {
          setIsOpenSidebar(false);
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
};

const NavbarContainer = ({ isMobile, openSidebar }) => {
  const navigate = useNavigate();

  return (
    <>
      {isMobile ? (
        <Box
          sx={{
            position: "fixed",
            top: 5,
            left: 0,
            zIndex: 100000,
          }}
        >
          <Button onClick={openSidebar}>
            <MenuIcon fontSize="large" color="info" />
          </Button>
        </Box>
      ) : (
        <Box
          style={{
            position: "absolute",
            bottom: "0vh",
            padding: isMobile ? "0.5rem" : "0.5rem 5rem",
            width: "100vw",
            height: "5vh",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={5}>
            {navbarItems.map((item) => (
              <Grid item md={1}>
                <Typography
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default function ArtistLayout() {
  return (
    <RootStyle>
      <ArtistLanding />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import AlbumsTable from "src/components/tables/albumTable";
import albumInstance from "src/axios/albumInstance";
import useSWR from "swr";

import Loader from "src/components/Loader";

const ArtistsViewSection = () => {
  const navigate = useNavigate();

  const fetchAlbums = async () => {
    const response = await albumInstance.get("/");
    return response.data.albums;
  };

  const {
    data: albums,
    error,
    isLoading,
  } = useSWR("get all albums", fetchAlbums, {
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleAlbumNavigation = (albumId) => {
    navigate(`/dashboard/albums/${albumId}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
      }}
    >
      <Grid
        container
        py={7}
        spacing={3}
        px={{
          xs: 2,
          sm: 2,
          md: 4,
        }}
      >
        <Grid item md={12} display="flex" justifyContent="center">
          <Typography variant="h4" fontWeight="bold">
            All Albums
          </Typography>
        </Grid>
        <Grid item md={12} xs={12} display="flex" justifyContent="center">
          <AlbumsTable
            handleAlbumNavigation={handleAlbumNavigation}
            albums={albums}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistsViewSection;

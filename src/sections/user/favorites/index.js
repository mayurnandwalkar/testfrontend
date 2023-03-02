import { Box, Container, Grid, Typography } from "@mui/material";

import uuid from "react-uuid";

import favoriteInstance from "src/axios/favoriteInstance";
import FavoritesTabs from "./tabs";
import useSWR from "swr";
import Loader from "src/components/Loader";

const FavoritesViewSection = () => {
  const fetchFavorites = async () => {
    const response = await favoriteInstance.get("/");

    return response.data.favorite;
  };

  const {
    data: favorites,
    error,
    isLoading,
  } = useSWR(
    "favorites",

    fetchFavorites,
    {
      revalidateOnFocused: true,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) console.error(error);

  return (
    <Box>
      <Container>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Favorites
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FavoritesTabs favorites={favorites} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FavoritesViewSection;

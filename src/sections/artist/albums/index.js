import { Grid, Typography, Stack, Button, Container, Box } from "@mui/material";

import albumInstance from "src/axios/albumInstance";

import AlbumCard from "src/components/albumCard";
import Loader from "src/components/Loader";
import useSWR from "swr";

const ArtistAlbumsSection = () => {
  const fetchAlbums = async () => {
    const response = await albumInstance.get("/user");

    return response.data.albums;
  };

  const {
    data: albums,
    error,
    isLoading,
  } = useSWR("albums", fetchAlbums, {
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) console.error(error);

  const renderAlbums = () => {
    return albums.map((album) => {
      return (
        <Grid item xs={6} sm={6} md={2} lg={2} key={album._id}>
          <AlbumCard album={album} />
        </Grid>
      );
    });
  };

  return (
    <Container maxWidth="xl">
      {albums.length > 0 ? (
        <Grid container spacing={4}>
          {renderAlbums()}
        </Grid>
      ) : (
        <Typography variant="h6">No albums found</Typography>
      )}
    </Container>
  );
};

export default ArtistAlbumsSection;

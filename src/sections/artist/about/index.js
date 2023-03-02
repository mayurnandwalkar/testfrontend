import { Container, Grid, Stack, Typography } from "@mui/material";

import artistInstance from "src/axios/artistInstance";
import Loader from "src/components/Loader";

import useSWR from "swr";

const ArtistViewSection = () => {
  const fetchArtist = async () => {
    const response = await artistInstance.get(`/user`);

    return response.data.artist;
  };

  const {
    data: artist,
    error,
    isLoading,
  } = useSWR(`artist`, fetchArtist, {
    revalidateOnFocus: true,
  });

  console.log("Data", artist);

  if (isLoading) {
    return <Loader />;
  }

  const renderAddress = (address) => {
    return (
      <Stack spacing={2}>
        <Typography variant="body1">{address?.street}</Typography>
        <Typography variant="body1">{address?.city}</Typography>
        <Typography variant="body1">{address?.state}</Typography>
        <Typography variant="body1">{address?.country}</Typography>
        <Typography variant="body1">{address?.zip}</Typography>
      </Stack>
    );
  };
  return (
    <Container maxWidth="xl">
      <Grid container py={7} spacing={6}>
        <Grid item md={9}>
          <Grid container spacing={5}>
            <Grid item md={12}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                About
              </Typography>
            </Grid>
            <Grid item md={12} mt={2}>
              <Grid container spacing={6}>
                <Grid item md={12}>
                  <Grid container spacing={4}>
                    <Grid item md={4}>
                      <Stack spacing={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Type
                        </Typography>
                        <Typography variant="body1">{artist?.type}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item md={4}>
                      <Stack spacing={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Primary Genre
                        </Typography>
                        <Typography variant="body1">
                          {artist?.primaryGenre?.name}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item md={4}>
                      <Stack spacing={2}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Secondary Genre
                        </Typography>
                        <Typography variant="body1">
                          {artist?.secondaryGenre?.name}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Description
                    </Typography>
                    <Typography variant="body1">{artist?.bio}</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>{" "}
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Grid item md={12} mb={4}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Address
            </Typography>
          </Grid>
          <Grid item md={12}>
            {renderAddress(artist?.address)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ArtistViewSection;

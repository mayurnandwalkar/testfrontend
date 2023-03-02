import { Grid, Typography, Stack, Button, Box, Container } from "@mui/material";
import trackInstance from "src/axios/trackInstance";
import playlistInstance from "src/axios/playlistInstance";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-grid-carousel";

import useSWR, { mutate } from "swr";

import TrackCard from "src/components/trackCard";
import Loader from "src/components/Loader";

const UserDashboardSection = ({ view }) => {
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    const response = await playlistInstance.get("/");
    console.log(response.data);
    return response.data.playlists;
  };

  const fetchTracks = async () => {
    const response = await trackInstance.get("/");

    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    "fetch all tracks for dashboard section",
    fetchTracks
  );

  if (view !== "unauthenticated") {
  }
  const { data: playlists } = useSWR(
    view !== "unauthenticated" ? "fetch playlists" : null,
    fetchPlaylists
  );

  if (isLoading) {
    return <Loader />;
  }

  const refetchPlaylists = () => {
    mutate("fetch playlists");
  };

  const renderTracks = () => {
    return (
      <Carousel
        cols={6}
        rows={1}
        gap={15}
        responsiveLayout={[
          {
            breakpoint: 1200,
            cols: 3,
          },
          {
            breakpoint: 990,
            cols: 3,
          },
        ]}
        mobileBreakpoint={670}
        scrollSnap={false}
      >
        {data.tracks.map((track) => (
          <Carousel.Item key={track._id}>
            <TrackCard
              track={track}
              playlists={playlists}
              fetchPlaylists={refetchPlaylists}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  const renderTracksByGenre = () => {
    return Object.keys(data?.tracksByGenre).map((genre) => {
      let { tracks, slug } = data?.tracksByGenre[genre];

      // Explicitly fill the array with 10 elements. This is to be removed later.
      // tracks = Array(10).fill(tracks[0]);

      return (
        <Grid item md={12} xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" color="initial" gutterBottom>
              {genre}
            </Typography>
            {tracks?.length > 5 && (
              <Button
                variant="text"
                color="primary"
                onClick={() =>
                  navigate(`/dashboard/tracks/genre/${slug.toLowerCase()}`)
                }
              >
                See all
              </Button>
            )}
          </Stack>

          <Carousel
            cols={6}
            rows={1}
            gap={15}
            responsiveLayout={[
              {
                breakpoint: 1200,
                cols: 3,
              },
              {
                breakpoint: 990,
                cols: 3,
              },
            ]}
            mobileBreakpoint={670}
            scrollSnap={false}
          >
            {tracks.map((track) => (
              <Carousel.Item key={track._id}>
                <TrackCard
                  track={track}
                  playlists={playlists}
                  fetchPlaylists={refetchPlaylists}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
      );
    });
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={12} xs={12}>
              <Typography variant="h6" color="initial">
                Trending
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              {data?.tracks?.length > 0 && renderTracks()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={4}>
            {renderTracksByGenre()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboardSection;

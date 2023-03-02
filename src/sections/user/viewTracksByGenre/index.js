import { Grid, Typography, Stack, Button, Container, Box } from "@mui/material";
import trackInstance from "src/axios/trackInstance";
import { useParams } from "react-router-dom";
import TrackCard from "src/components/trackCard";

import Loader from "src/components/Loader";

import useSWR from "swr";

const ViewTracksByGenreSection = () => {
  const params = useParams();
  const slug = params.slug;

  const fetchTracksByGenre = async () => {
    const response = await trackInstance.get(`/genre/${slug}`);

    return {
      tracks: response.data.tracks,
      genre: response.data.genre,
    };
  };

  const { data, error, isLoading } = useSWR(
    `genre/${slug}`,
    fetchTracksByGenre,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Typography
            variant="h4"
            color="primary.main"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {data.genre.name}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={3}>
            {data?.tracks.length > 0 ? (
              data?.tracks.map((track) => {
                return (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={2}
                    lg={2}
                    key={track?._id}
                    my={2}
                  >
                    <TrackCard track={track} />
                  </Grid>
                );
              })
            ) : (
              <Grid item md={12} xs={12}>
                <Typography variant="body1" color="initial">
                  No tracks found
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewTracksByGenreSection;

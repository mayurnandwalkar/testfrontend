import {
  Grid,
  Typography,
  Stack,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import trackInstance from "src/axios/trackInstance";
import { useNavigate } from "react-router-dom";
import Loader from "src/components/Loader";

import useSWR from "swr";

const ArtistTracksSection = () => {
  const navigate = useNavigate();

  const fetchTracks = async () => {
    const response = await trackInstance.get("/user");
    return response.data.tracks;
  };

  const {
    data: tracks,
    error,
    isLoading,
  } = useSWR(`artist/tracks`, fetchTracks, {
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleTrackNavigation = (trackId) => {
    navigate(`/artist/tracks/${trackId}`);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={3}>
            {tracks.map((track) => (
              <Grid item md={2} xs={2} sm={4} key={track?._id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTrackNavigation(track?._id)}
                >
                  <CardMedia
                    component="img"
                    image={track?.coverImage}
                    alt="track"
                    sx={{
                      height: "10rem",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "1rem 1rem 0 0",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" color="initial">
                      {track?.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ArtistTracksSection;

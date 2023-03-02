import { useNavigate } from "react-router-dom";

import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  LoadingButton,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import trackInstance from "src/axios/trackInstance";

import useSWR from "swr";
import Loader from "src/components/Loader";

const PurchasedTracksSection = () => {
  const navigate = useNavigate();

  const fetchTracks = async () => {
    const response = await trackInstance.get("/purchased-tracks");

    console.log(response);
    return response.data.purchasedTracks;
  };

  const {
    data: tracks,
    error,
    isLoading,
  } = useSWR("purchased-tracks", fetchTracks, {
    revalidateOnFocused: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  const handleCardClick = (trackId) => {
    navigate(`/dashboard/track/${trackId}`);
  };

  const renderPurchasedTracks = () => {
    return tracks.map((track) => {
      return (
        <Grid item xs={12} sm={6} md={5} lg={2} key={track._id}>
          <Card
            sx={{
              borderRadius: "0.8rem",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
              height: "100%",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => {
              handleCardClick(track._id);
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={track.coverImage}
              alt={track.title}
            />

            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h5" component="div">
                  {track.title}
                </Typography>
                <Typography variant="body2">
                  {track.artistId.groupName}
                </Typography>
                <Chip label={track.genre.name} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={2} p={5}>
      {tracks?.length > 0 ? (
        renderPurchasedTracks()
      ) : (
        <Grid item md={12}>
          <Typography variant="h5">No tracks purchased yet</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PurchasedTracksSection;

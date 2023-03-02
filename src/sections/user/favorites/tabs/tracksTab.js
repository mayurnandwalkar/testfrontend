import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TracksTab = ({ tracks }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {tracks?.length > 0 ? (
        tracks?.map((track) => (
          <Grid item xs={12} md={6} lg={4} key={track._id}>
            <Card
              sx={{
                cursor: "pointer",
              }}
              onClick={() => navigate(`/dashboard/track/${track._id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={track.coverImage}
                alt={track.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {track.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1" component="div">
            No tracks found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TracksTab;

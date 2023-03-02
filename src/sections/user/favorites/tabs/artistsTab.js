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

const ArtistsTab = ({ artists }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={3}>
      {artists?.length > 0 ? (
        artists?.map((artist) => (
          <Grid item xs={12} md={6} lg={4} key={artist._id}>
            <Card
              sx={{
                cursor: "pointer",
              }}
              onClick={() => navigate(`/dashboard/artist/${artist._id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={artist.profilePicture}
                alt={artist.groupName}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {artist.groupName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1" component="div">
            No artists found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ArtistsTab;

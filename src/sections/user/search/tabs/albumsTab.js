import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import { fDate } from "src/utils/formatTime";
import { useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AlbumsTab = ({ albums }) => {
  const navigate = useNavigate();

  const handleAlbumNavigation = (id) => {
    navigate(`/dashboard/album/${id}`);
  };

  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid
          item
          md={12}
          xs={12}
          key={album._id}
          onClick={() => {
            handleAlbumNavigation(album._id);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Card>
            <Grid container spacing={2} p={2} alignItems="center">
              <Grid item md={2} xs={6}>
                <LazyLoadImage
                  src={album.coverImage}
                  alt={album.title}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "50%",
                  }}
                  effect="blur"
                />
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography gutterBottom variant="body1" component="div">
                  {album.title}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {album.artist[0].groupName}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Chip label={album.genre} />
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {fDate(album.releaseDate)}
                </Typography>
              </Grid>
              <Grid item md={1} xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {album.trackCount} {album.trackCount > 1 ? "tracks" : "track"}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumsTab;

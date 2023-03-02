import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { fDate } from "src/utils/formatTime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function AlbumCard({ album }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate("/cart");
  };

  const handleCardClick = () => {
    navigate("/artist/albums/" + album._id);
  };

  return (
    <Card
      sx={{
        borderRadius: "0.8rem",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        height: "100%",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => {
        handleCardClick();
      }}
    >
      <Stack p={2}>
        <LazyLoadImage
          src={album.coverImage}
          alt={album.title}
          style={{
            borderRadius: "0.8rem",
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
          effect="blur"
        />

        <Grid container spacing={2} pt={2}>
          <Grid item md={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {album.title}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Stack direction="column" spacing={1}>
              <Typography variant="body2">{album.genre.name}</Typography>
              <Typography variant="caption" color="initial">
                {album?.releaseDate && fDate(album?.releaseDate)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

export default AlbumCard;

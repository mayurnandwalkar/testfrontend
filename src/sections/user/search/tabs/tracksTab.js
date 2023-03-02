import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { fDate } from "src/utils/formatTime";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { addToCart } from "src/store/actions/cartActions";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const TracksTab = ({ tracks }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTrackNavigation = (id) => {
    navigate(`/dashboard/track/${id}`);
  };

  const handleAddToCart = (track) => {
    console.log("add to cart clicked", track);
    const item = {
      id: track._id,
      title: track.title,
      price: track.price,
      image: track.coverImage,
      artist: track.artistId._id,
    };
    dispatch(addToCart(item));
  };

  return (
    <Grid container spacing={2}>
      {tracks.map((track) => (
        <Grid
          item
          md={12}
          key={track._id}
          onClick={() => {
            handleTrackNavigation(track._id);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Card>
            <Grid container spacing={2} p={2} alignItems="center">
              <Grid item md={1} xs={6}>
                <LazyLoadImage
                  src={track.coverImage}
                  alt={track.title}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "50%",
                  }}
                  effect="blur"
                />
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography gutterBottom variant="body1" component="div">
                  {track.title}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {track.artist[0].groupName}
                </Typography>
              </Grid>
              <Grid item md={2} xs={6}>
                <Chip label={track.genre} />
              </Grid>
              <Grid item md={2} xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {fDate(track.releaseDate)}
                </Typography>
              </Grid>
              <Grid item md={1} xs={3}>
                <Typography variant="body2" color="text.secondary">
                  {moment.utc(track.duration * 1000).format("mm:ss")}
                </Typography>
              </Grid>
              <Grid item md={1} xs={3}>
                <Typography variant="body2" color="text.secondary">
                  {parseInt(track.price * 100) / 100} $
                </Typography>
              </Grid>
              {/* <Grid item md={1}>
                <IconButton
                  aria-label="add to shopping cart"
                  sx={{ color: "text.secondary" }}
                  onClick={(event) => {
                    console.log("cart clicked");
                    event.stopPropagation();

                    handleAddToCart(track);
                  }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Grid> */}
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TracksTab;

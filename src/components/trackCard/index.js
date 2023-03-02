import React, { useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart, clearCart } from "src/store/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

import DownloadIcon from "@mui/icons-material/Download";
import PlayCircle from "@mui/icons-material/PlayCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { toast } from "react-toastify";
import AddToPlaylistMenu from "../addToPlaylist/menu";
import { playTrack } from "src/store/actions/trackPlayActions";

import trackInstance from "src/axios/trackInstance";
import playlistInstance from "src/axios/playlistInstance";

function TrackCard({ track, playlists, fetchPlaylists }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);

  const artist = track?.artistId?.groupName;

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const handleAddToCart = (track) => {
    const item = {
      id: track._id,
      title: track.title,
      price: track.price,
      image: track.coverImage,
      artist: track.artistId._id,
    };
    dispatch(addToCart(item));

    toast.success("Track added to cart", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const handleCardClick = () => {
    console.log("card clicked, navigate to track page");
    navigate("/dashboard/track/" + track._id);
  };

  const handleTrackDownload = async () => {
    try {
      const response = await trackInstance.get(`/${track._id}/download`);

      const link = document.createElement("a");
      link.href = response.data.downloadLink;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      const toastId = toast.error(error.response.data.message);

      toast.update(toastId, {
        render: error.response.data.message,

        type: toast.TYPE.ERROR,
        autoClose: 4000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const handleTrackPlay = (track) => {
    const trackData = {
      track: track,
      playlist: [],
    };

    dispatch(playTrack(trackData));
  };

  const addToPlaylist = async (playlistId) => {
    const res = await playlistInstance.post(`/${playlistId}/add-track`, {
      trackId: track._id,
    });

    console.log(res.data);
    const toastId = toast.success("Track Added to Playlist");

    toast.update(toastId, {
      render: res.data.message,
      type: toast.TYPE.SUCCESS,
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const OverLaySection = () => {
    return (
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item md={12} xs={12}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"center"}
              alignItems="center"
            >
              <PlayCircle
                sx={{
                  color: "primary.main",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrackPlay(track);
                }}
              />
              {/* <FavoriteBorderIcon
                sx={{
                  color: "primary.main",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
              /> */}
              <DownloadIcon
                sx={{
                  color: "primary.main",
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTrackDownload();
                }}
              />
              <AddToPlaylistMenu
                playlists={playlists}
                fetchPlaylists={fetchPlaylists}
                addToPlaylist={addToPlaylist}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        height: "100%",
        width: "100%",
        // cursor: "pointer",
      }}
      onMouseEnter={() => {
        setShowOverlay(true);
      }}
      onMouseLeave={() => {
        setShowOverlay(false);
      }}
    >
      <Stack p={1}>
        <Box
          sx={{
            width: "100%",
            height: "200px",
            display: "block",
            position: "relative",
          }}
        >
          <img
            src={track.coverImage}
            loading="lazy"
            alt={track.title}
            style={{
              borderRadius: "0.5rem",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: showOverlay ? "brightness(0.4)" : "brightness(1)",
            }}
          />

          {showOverlay && location.pathname !== "/" && <OverLaySection />}
        </Box>

        <Grid
          container
          spacing={2}
          pt={2}
          onClick={() => {
            handleCardClick();
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Grid item md={12} xs={12}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {track.title}
            </Typography>
          </Grid>
          <Grid item md={10} xs={10}>
            <Typography variant="body2" gutterBottom>
              {artist}
            </Typography>
            <Chip label={track.genre.name} />
          </Grid>
          {isSignedIn && (
            <Grid
              item
              md={2}
              xs={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                aria-label="add to shopping cart"
                sx={{ color: "text.primary" }}
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddToCart(track);
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Card>
  );
}

export default TrackCard;

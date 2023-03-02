import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlayCircle from "@mui/icons-material/PlayCircle";

import { Navigate, useParams } from "react-router-dom";
import trackInstance from "src/axios/trackInstance";
import playlistInstance from "src/axios/playlistInstance";
import favoriteInstance from "src/axios/favoriteInstance";
import { addToCart } from "src/store/actions/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { playTrack } from "src/store/actions/trackPlayActions";

import AddToPlaylistMenu from "src/components/addToPlaylist/menu";
import moment from "moment";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { hideLoader } from "src/store/actions/loaderActions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Loader from "src/components/Loader";
import useSWR, { mutate } from "swr";

function TrackViewSection() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const response = await playlistInstance.get("/");
    console.log(response.data);
    setPlaylists(response.data.playlists);
  };

  const fetchSingleTrack = async () => {
    const response = await trackInstance.get(`/${trackId}`);
    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    `track/${trackId}`,
    fetchSingleTrack,
    {
      revalidateOnFocus: true,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) console.error(error);

  if (!isLoading) {
    var { track, purchased, favorite } = data;
  }

  const handleArtistNavigation = () => {
    navigate(`/dashboard/artist/${track.artistId._id}`);
  };

  const handleAlbumNavigation = () => {
    navigate(`/dashboard/album/${track.albumId._id}`);
  };

  const handleTrackDownload = async () => {
    try {
      const response = await trackInstance.get(`/${trackId}/download`);

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

  const handleAddToCart = (track) => {
    const item = {
      id: track._id,
      title: track.title,
      price: track.price,
      image: track.coverImage,
      artist: track.artistId._id,
    };
    dispatch(addToCart(item));
  };

  const handleTrackPlay = (track) => {
    const trackData = {
      track: track,
      playlist: [],
    };

    dispatch(playTrack(trackData));
  };

  const handleAddToPlaylist = async (playlistId) => {
    const res = await playlistInstance.post(`/${playlistId}/add-track`, {
      trackId: trackId,
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

  const addToFavorites = async () => {
    const res = await favoriteInstance.post(`/track/${track._id}`);
    console.log(res.data);

    mutate(`track/${trackId}`, { track, purchased, favorite: true }, false);
  };

  const removeFromFavorites = async () => {
    await favoriteInstance.delete(`/track/${track._id}`);

    mutate(`track/${trackId}`, { track, purchased, favorite: false }, false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
      }}
    >
      <Grid container py={7}>
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LazyLoadImage
            src={track?.coverImage}
            style={{
              height: "15rem",
              width: "15rem",
              objectFit: "cover",
              borderRadius: "0.8rem",
            }}
            alt={track?.title}
            effect="blur"
          />
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          px={{
            xs: 4,
          }}
        >
          <Stack spacing={1} py={3}>
            <Typography variant="h4" color="initial">
              {track?.title}
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              onClick={handleArtistNavigation}
              sx={{
                cursor: "pointer",
              }}
            >
              {track?.artistId?.groupName}
            </Typography>
            {track?.albumId && (
              <Typography
                variant="body1"
                color="initial"
                onClick={handleAlbumNavigation}
                sx={{
                  cursor: "pointer",
                }}
              >
                {track?.albumId?.title}
              </Typography>
            )}
            <Typography variant="body1" color="initial">
              {track?.genre?.name}
            </Typography>
            <Typography variant="body1" color="initial">
              {moment.utc(track?.duration * 1000).format("mm:ss")}
            </Typography>
            <Typography variant="body1" color="initial">
              Price : $ {parseInt(track?.price * 100) / 100}
            </Typography>
            <Typography variant="body1" color="initial">
              Downloads: {track?.totalDownloads}
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={5} xs={12}>
          <Stack spacing={1} py={3} direction="row">
            <Button>
              <PlayCircle
                color="primary"
                sx={{
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleTrackPlay(track);
                }}
              />
            </Button>
            {!purchased && (
              <Button>
                <AddShoppingCartIcon
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                  }}
                  onClick={() => {
                    handleAddToCart(track);
                  }}
                />
              </Button>
            )}

            <Button>
              <DownloadIcon
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
                onClick={() => {
                  handleTrackDownload();
                }}
              />
            </Button>

            <Button>
              {favorite ? (
                <FavoriteIcon
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                  }}
                  onClick={() => {
                    removeFromFavorites();
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                  }}
                  onClick={() => {
                    addToFavorites();
                  }}
                />
              )}
            </Button>

            <AddToPlaylistMenu
              track={track}
              playlists={playlists}
              trackId={trackId}
              addToPlaylist={handleAddToPlaylist}
              fetchPlaylists={fetchPlaylists}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TrackViewSection;

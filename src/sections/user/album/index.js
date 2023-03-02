import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import albumInstance from "src/axios/albumInstance";
import { fDate } from "src/utils/formatTime";
import TracksTable from "src/components/tables/tracksTable";
import { hideLoader } from "src/store/actions/loaderActions";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from "moment";

import Loader from "src/components/Loader";
import useSWR, { mutate } from "swr";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ArtistViewSection = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const fetchSingleAlbum = async () => {
    const response = await albumInstance.get(`/${albumId}`);

    return response.data.album;
  };

  const {
    data: album,
    error,
    isLoading,
  } = useSWR(`album/${albumId}`, fetchSingleAlbum, {
    revalidateOnFocus: true,
  });

  console.log("Data", album);

  if (isLoading) {
    return <Loader />;
  }

  const albumDuration = () => {
    const duration = album?.tracks?.reduce((acc, track) => {
      return acc + track?.duration;
    }, 0);
    return moment.utc(duration * 1000).format("mm:ss");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
        padding: isMobile ? "1.5rem" : "4rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <LazyLoadImage
            src={album?.coverImage}
            style={{
              height: "15rem",
              width: "15rem",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
            alt={album?.title}
            effect="blur"
          />
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3" color="initial" gutterBottom>
              {album?.title}
            </Typography>
            <Typography
              variant="h6"
              color="initial"
              gutterBottom
              onClick={() => {
                navigate(`/dashboard/artist/${album?.artistId?._id}`);
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              {album?.artistId.groupName}
            </Typography>

            <Typography variant="body1" color="initial" gutterBottom>
              {album?.releaseDate && fDate(album?.releaseDate)}
            </Typography>
            <Typography variant="body1" color="initial" gutterBottom>
              {album?.genre?.name}
            </Typography>
            <Typography variant="body1" color="initial" gutterBottom>
              {album?.tracks?.length} Tracks
            </Typography>
            <Typography variant="body1" color="initial">
              {album?.tracks && albumDuration()}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container py={7}>
        <Grid item md={12}>
          <Typography variant="h6" color="initial" gutterBottom>
            Tracks
          </Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          {album?.tracks && <TracksTable tracks={album?.tracks} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistViewSection;

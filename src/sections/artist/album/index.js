import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Box, Grid, Stack, Typography } from "@mui/material";

import albumInstance from "src/axios/albumInstance";
import { fDate } from "src/utils/formatTime";
import TracksTable from "src/components/tables/artistTracksTable";
import Loader from "src/components/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import moment from "moment";

import useSWR from "swr";

const ArtistViewSection = () => {
  const { albumId } = useParams();

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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Failed to load</div>;
  }

  const albumDuration = () => {
    const duration = album?.tracks?.reduce((acc, track) => {
      return acc + track?.duration;
    }, 0);

    return moment.utc(duration * 1000).format("HH:mm:ss");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
      }}
      p={{
        xs: 1,
        md: 4,
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={3}>
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
        <Grid item md={9}>
          <Stack spacing={1}>
            <Typography variant="h3" color="initial" gutterBottom>
              {album?.title}
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

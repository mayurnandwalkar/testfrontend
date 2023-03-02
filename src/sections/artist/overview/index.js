import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Grid, Typography, Card, Stack, Chip } from "@mui/material";
import AudioUploader from "src/components/audioPicker";
import artistInstance from "src/axios/artistInstance";
import Loader from "src/components/Loader";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import useSWR, { mutate } from "swr";

function ArtistOverviewSection() {
  const fetchArtistOverview = async () => {
    const response = await artistInstance.get("/overview");
    console.log("Response data", response.data);

    return {
      artist: response.data.artist[0],
      topArtists: response.data.topArtists,
    };
  };

  const { data, error, isLoading } = useSWR(
    `artist/overview`,
    fetchArtistOverview,
    {
      revalidateOnFocus: true,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  const refetchOverviewSection = () => {
    mutate("artist/overview");
  };

  const renderCards = () => {
    return (
      <>
        <Grid item xs={6} md={4} lg={2}>
          <Card
            sx={{ p: 2, textAlign: "center", height: "10rem", width: "10rem" }}
            onMouseOver={() => {
              console.log("mouse enter");
            }}
            onMouseOut={() => {
              console.log("mouse leave");
            }}
          >
            <Typography variant="h6">Total tracks</Typography>
            <Typography variant="h4">{data.artist?.trackCount}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Card
            sx={{ p: 2, textAlign: "center", height: "10rem", width: "10rem" }}
          >
            <Typography variant="h6">Total albums</Typography>
            <Typography variant="h4">{data.artist?.albumCount}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Card
            sx={{ p: 2, textAlign: "center", height: "10rem", width: "10rem" }}
          >
            <Typography variant="h6">Total followers</Typography>
            <Typography variant="h4">{data.artist?.followerCount}</Typography>
          </Card>
        </Grid>
      </>
    );
  };

  const renderTopArtistByGenre = () => {
    return data?.topArtists?.map((artist, index) => {
      return (
        <Grid item xs={12} md={12} lg={12} key={index}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item md={3}>
                <LazyLoadImage
                  src={artist.profilePicture}
                  alt="artist"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "1rem",
                  }}
                  effect="blur"
                />
              </Grid>
              <Grid item md={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography variant="h6">{artist.groupName}</Typography>
                  <Chip label={artist.primaryGenre} />
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Typography variant="body1">
                  {artist.followerCount > 1
                    ? `${artist.followerCount} followers`
                    : `${artist.followerCount} follower`}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Grid
      container
      py={1}
      px={{
        xs: 1,
        md: 5,
      }}
      spacing={3}
    >
      <Grid item xs={12} md={8} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid
              container
              spacing={{
                xs: 1,
                md: 2,
              }}
            >
              {renderCards()}
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AudioUploader refetchOverviewSection={refetchOverviewSection} />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        lg={4}
        sx={{
          overflowY: "auto",
          height: "50vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6">Top Artist</Typography>
          </Grid>
          {renderTopArtistByGenre()}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ArtistOverviewSection;

import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ArtistsTab = ({ artists }) => {
  const navigate = useNavigate();

  const handleArtistNavigation = (id) => {
    navigate(`/dashboard/artist/${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      p={{
        xs: 0,
      }}
    >
      {artists.map((artist) => (
        <Grid
          item
          md={12}
          xs={12}
          key={artist._id}
          onClick={() => {
            handleArtistNavigation(artist._id);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Card>
            <Grid container spacing={2} p={2} alignItems="center">
              <Grid item md={2}>
                <LazyLoadImage
                  src={artist.profilePicture}
                  alt={artist.firstName}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "50%",
                  }}
                  effect="blur"
                />
              </Grid>
              <Grid item md={4}>
                <Typography gutterBottom variant="body1" component="div">
                  {artist.groupName}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="body2" color="text.secondary">
                  {artist.albumCount}{" "}
                  {artist.albumCount > 1 ? "albums" : "album"}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="body2" color="text.secondary">
                  {artist.trackCount}{" "}
                  {artist.trackCount > 1 ? "tracks" : "track"}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="body2" color="text.secondary">
                  {artist.followerCount}{" "}
                  {artist.followerCount > 1 ? "followers" : "follower"}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArtistsTab;

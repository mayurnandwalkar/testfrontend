import React, { useEffect, useState } from "react";

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

import followInstance from "src/axios/followInstance";
import artistInstance from "src/axios/artistInstance";
import { useDispatch } from "react-redux";
import { playTrack } from "src/store/actions/trackPlayActions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Loader from "src/components/Loader";
import useSWR, { mutate } from "swr";

const ArtistViewSection = () => {
  const { artistId } = useParams();

  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  console.log("artist sasasaId", artistId);

  const fetchSingleArtist = async () => {
    const response = await artistInstance.get(`/${artistId}`);

    console.log("Response data", response.data);
    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    `artist/${artistId}`,
    fetchSingleArtist,
    {
      revalidateOnFocus: true,
    }
  );

  console.log("Data", data);

  if (!isLoading) {
    var { artist, followers, isFollowing, tracks, albums } = data;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) console.error(error);

  const handleTrackNavigation = (trackId) => {
    navigate(`/dashboard/track/${trackId}`);
  };

  const followArtist = async (artistId) => {
    await followInstance.post(`/${artistId}`);

    mutate(`artist/${artistId}`);
  };

  const unfollowArtist = async (artistId) => {
    await followInstance.delete(`/${artistId}`);
    mutate(`artist/${artistId}`);
  };

  const handlePlaylistPlay = (album) => {
    const trackData = {
      track: null,
      playlist: album.tracks.map((track) => {
        return {
          name: track.title,
          duration: track.duration,
          sources: [
            {
              src: track.file,
            },
          ],
          thumbnail: [
            {
              src: track.coverImage,
            },
          ],
        };
      }),
    };
    dispatch(playTrack(trackData));
  };

  const renderAlbums = () => {
    return (
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="initial" gutterBottom>
            Albums
          </Typography>
        </Grid>

        {albums.length > 0 ? (
          albums.map((album) => {
            return (
              <Grid item md={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={6}>
                        <Typography variant="h6" color="initial">
                          {album.title}
                        </Typography>
                      </Grid>
                      {album.tracks.length > 0 && (
                        <Grid item md={6} xs={6}>
                          <Button
                            variant="contained"
                            onClick={() => {
                              handlePlaylistPlay(album);
                            }}
                          >
                            Play Album
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
                      {album?.tracks?.length > 0 ? (
                        album.tracks.map((track) => {
                          return (
                            <Grid item md={2} xs={6} key={track?._id}>
                              <Card
                                sx={{
                                  height: "100%",
                                  borderRadius: "1rem",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleTrackNavigation(track?._id)
                                }
                              >
                                <CardMedia
                                  component="img"
                                  image={track?.coverImage}
                                  alt="track"
                                  sx={{
                                    height: "10rem",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "1rem 1rem 0 0",
                                  }}
                                />
                                <CardContent>
                                  <Typography variant="body1" color="initial">
                                    {track?.title}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })
                      ) : (
                        <Grid item md={12} xs={12}>
                          <Typography
                            variant="body1"
                            color="initial"
                            gutterBottom
                          >
                            No tracks present in this album
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Grid item md={12}>
            <Typography variant="body1" color="initial" gutterBottom>
              No albums present
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
        padding: "1rem",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "35vh",
        }}
      >
        <img
          src={artist?.bannerImage}
          alt="artist"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "absolute",
            top: isMobile ? "50%" : "7rem",
            left: isMobile ? "50%" : "5rem",
            width: isMobile ? "100%" : "auto",
            transform: isMobile ? "translate(-50%, -50%)" : "translate(0, 0)",
          }}
        >
          <LazyLoadImage
            effect="blur"
            src={artist?.profilePicture}
            style={{
              width: isMobile ? "6rem" : "9rem",
              height: isMobile ? "6rem" : "9rem",
              borderRadius: "50%",
            }}
            alt="artist"
          />
          <Stack direction="column" spacing={1}>
            <Typography
              variant="h3"
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {artist?.groupName}
            </Typography>
            <Stack direction="row" spacing={3} alignItems={"center"}>
              <Typography variant="body1" color="white">
                {followers} {followers > 1 ? "Followers" : "Follower"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  if (isFollowing) {
                    unfollowArtist(artist?._id);
                  } else {
                    followArtist(artist?._id);
                  }
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {renderAlbums()}
      <Grid container py={7}>
        {tracks.length > 0 ? (
          <>
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="h6" color="initial" gutterBottom>
                Tracks
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid
                container
                spacing={{
                  xs: 1,
                  sm: 2,
                  md: 2,
                }}
              >
                {tracks.map((track) => (
                  <Grid item md={2} xs={6} key={track?._id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleTrackNavigation(track?._id)}
                    >
                      <CardMedia
                        component="img"
                        image={track?.coverImage}
                        alt="track"
                        sx={{
                          height: "10rem",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "1rem 1rem 0 0",
                        }}
                      />
                      <CardContent>
                        <Typography variant="body1" color="initial">
                          {track?.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            This artist does not have any tracks yet
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ArtistViewSection;

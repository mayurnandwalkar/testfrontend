import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import playlistInstance from "src/axios/playlistInstance";
import { useParams } from "react-router-dom";
import PlaylistTracksTable from "src/components/tables/playlistTable";
import { useSelector, useDispatch } from "react-redux";
import { playTrack } from "src/store/actions/trackPlayActions";
import { hideLoader } from "src/store/actions/loaderActions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { DeleteOutlined, EditOutlined, PlayCircle } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import Loader from "src/components/Loader";
import useSWR, { mutate } from "swr";

const UserPlaylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [playlist, setPlaylist] = useState([]);
  const { playlistId } = useParams();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { playlist: playlistRedux, track } = useSelector(
    (state) => state.trackPlay
  );

  const [updatePlaylist, setUpdatePlaylist] = useState({
    name: "",
    editMode: false,
  });

  // useEffect(() => {
  //   fetchPlaylist();
  // }, []);

  // const fetchPlaylist = async () => {
  //   const response = await playlistInstance.get(`/${playlistId}`);
  //   setPlaylist(response.data.playlist);
  //   await dispatch(hideLoader());
  // };

  const fetchPlaylist = async () => {
    const response = await playlistInstance.get(`/${playlistId}`);
    return response.data.playlist;
  };

  const {
    data: playlist,
    error,
    isLoading,
  } = useSWR(`/playlist/${playlistId}`, fetchPlaylist);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>error</div>;
  }

  console.log("playlist", playlist);
  const deletePlaylist = async () => {
    try {
      const response = await playlistInstance.delete(`/${playlistId}`);
      navigate("/dashboard/playlists");
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteTrackFromPlaylist = async (trackId) => {
    try {
      await playlistInstance.delete(`/${playlistId}/remove-track/${trackId}`);

      mutate(`/playlist/${playlistId}`);
    } catch (error) {
      console.log({ error });
    }
  };

  const handlePlaylistPlay = () => {
    const trackData = {
      track: null,
      playlist: playlist.tracks.map((track) => {
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

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const updatePlaylistName = async () => {
    try {
      await playlistInstance.patch(`/${playlistId}/name`, {
        name: updatePlaylist.name,
      });

      mutate(`/playlist/${playlistId}`);

      setUpdatePlaylist({
        name: "",
        editMode: false,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Grid container spacing={2} py={3} px={{ xs: 2, md: 10 }}>
      <Grid item xs={12}>
        <Grid container spacing={2} py={3} px={{ xs: 2, md: 10 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <LazyLoadImage
              src="https://picsum.photos/200"
              style={{
                height: "15rem",
                width: "15rem",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
              alt={playlist?.name}
              effect="blur"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} key={playlist._id}>
            <Grid container spacing={2} py={3}>
              <Grid item xs={12} md={11}>
                <Stack direction={{ xs: "row", sm: "row" }} spacing={2} mb={2}>
                  {updatePlaylist.editMode ? (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={updatePlaylist.name}
                      size="small"
                      placeholder="Enter new playlist name"
                      onChange={(e) => {
                        setUpdatePlaylist({
                          ...updatePlaylist,
                          name: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <Typography variant="h4">{playlist?.name}</Typography>
                  )}

                  {updatePlaylist.editMode ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={updatePlaylist.name.length < 1}
                        onClick={() => {
                          updatePlaylistName();
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setUpdatePlaylist({
                            ...updatePlaylist,
                            editMode: false,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button>
                      <EditOutlined
                        color="primary"
                        sx={{
                          cursor: "pointer",
                          height: "100%",
                        }}
                        onClick={() => {
                          setUpdatePlaylist({
                            ...updatePlaylist,
                            editMode: true,
                          });
                        }}
                      />
                    </Button>
                  )}
                </Stack>
              </Grid>
              <Grid item md={1} xs={12} display="flex" alignItems={"flex-end"}>
                <Stack spacing={2} direction="row">
                  <PlayCircle
                    color="primary"
                    sx={{
                      cursor: "pointer",
                      height: "100%",
                      fontSize: "3rem",
                    }}
                    onClick={() => {
                      if (playlist.tracks.length > 0) {
                        handlePlaylistPlay();
                      }
                    }}
                  />

                  <DeleteOutlined
                    color="error"
                    sx={{
                      cursor: "pointer",
                      height: "100%",
                      fontSize: "3rem",
                    }}
                    onClick={() => {
                      handleOpenDeleteDialog();
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mb={playlistRedux.length > 0 || track ? 30 : 0}>
        <PlaylistTracksTable
          tracks={playlist.tracks}
          deleteTrackFromPlaylist={deleteTrackFromPlaylist}
        />
      </Grid>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete playlist?"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Are you sure you want to delete this playlist?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              deletePlaylist();
              handleCloseDeleteDialog();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserPlaylist;

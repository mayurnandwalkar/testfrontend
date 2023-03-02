import { useState } from "react";
import playlistInstance from "src/axios/playlistInstance";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreatePlaylistDialog from "src/components/addToPlaylist/dialog";
import Loader from "src/components/Loader";
import useSWR from "swr";

const UserPlaylists = () => {
  const navigate = useNavigate();
  const [openCreatePlaylistDialog, setOpenCreatePlaylistDialog] =
    useState(false);

  const fetchPlaylists = async () => {
    const response = await playlistInstance.get("/");

    return response.data;
  };

  const { data, error, isLoading } = useSWR(
    "get all playlists",
    fetchPlaylists,
    {
      revalidateOnFocused: true,
    }
  );

  const handleOpenCreatePlaylistDialog = () => {
    setOpenCreatePlaylistDialog(true);
  };

  const handleCloseCreatePlaylistDialog = () => {
    setOpenCreatePlaylistDialog(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2} py={3} px={{ xs: 2, md: 10 }}>
      <Grid item xs={12} mb={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenCreatePlaylistDialog();
          }}
        >
          Create playlist
        </Button>
      </Grid>

      {data.playlists?.length > 0 ? (
        data.playlists?.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={playlist._id}>
            <Card
              onClick={() => {
                navigate(`/dashboard/playlist/${playlist._id}`);
              }}
              sx={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`https://picsum.photos/${
                  Math.floor(Math.random() * 100) + 100
                }/200`}
                alt={playlist.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {playlist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {playlist.tracks.length} tracks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h4" fontWeight="bold">
          No playlists found
        </Typography>
      )}

      <CreatePlaylistDialog
        open={openCreatePlaylistDialog}
        handleClose={handleCloseCreatePlaylistDialog}
        fetchPlaylists={fetchPlaylists}
      />
    </Grid>
  );
};

export default UserPlaylists;

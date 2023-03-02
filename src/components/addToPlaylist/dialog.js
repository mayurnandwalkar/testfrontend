import { useState } from "react";

import {
  TextField,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import playlistInstance from "src/axios/playlistInstance";

export default function CreatePlaylistDialog({
  open,
  handleClose,
  fetchPlaylists,
}) {
  const [playlistName, setPlaylistName] = useState("");

  const createPlaylistAndClose = async () => {
    const res = await playlistInstance.post("/", {
      name: playlistName,
    });
    console.log("res", res);
    setPlaylistName("");

    fetchPlaylists();

    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">Create new playlist</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText id="alert-dialog-description">
              Enter your playlist name
            </DialogContentText>
            <TextField
              autoFocus
              id="name"
              variant="outlined"
              label="Name"
              type="text"
              fullWidth
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPlaylistName("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={createPlaylistAndClose}
            autoFocus
            disabled={playlistName.length === 0}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

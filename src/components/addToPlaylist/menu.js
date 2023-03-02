import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddToPlaylistDialog from "./dialog";
import { Divider } from "@mui/material";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function AddToPlaylistMenu({
  playlists,
  addToPlaylist,

  fetchPlaylists,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreatePlaylist = () => {
    handleOpenDialog();
  };

  const handleAddToPlaylist = (playlistId) => {
    addToPlaylist(playlistId);

    handleClose();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <PlaylistAddIcon
        fontSize="large"
        sx={{
          color: "primary.main",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {playlists?.map((playlist) => (
          <MenuItem
            key={playlist._id}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToPlaylist(playlist._id);
            }}
          >
            {playlist.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
            handleCreatePlaylist();
          }}
        >
          Create new playlist
        </MenuItem>
      </Menu>

      <AddToPlaylistDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleOpen={handleOpenDialog}
        fetchPlaylists={fetchPlaylists}
      />
    </>
  );
}

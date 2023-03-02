import React, { useState } from "react";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {
  DialogContent,
  Stack,
  DialogContentText,
  Grid,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";

import SingleTrackForm from "./singleTrackForm";
import AddToAlbumForm from "./addToAlbumForm";
import CreateNewAlbumForm from "./createNewAlbumForm";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AudioDialog = (props) => {
  const { onClose, selectedValue, open, refetchOverviewSection } = props;
  const [trackType, setTrackType] = useState("");
  const [album, setAlbum] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = (event) => {
    setTrackType(event.target.value);
  };

  const handleAlbumSelection = (event) => {
    setAlbum(event.target.value);
  };

  const isAlbumSelected = trackType === "album";
  const isSingleSelected = trackType === "single";
  const isCreateAlbumSelected = trackType === "create-album";

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogTitle id="alert-dialog-title">{"Upload Audio"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <FormControl>
              <FormLabel id="">
                Do you want to upload a single track or add to an album?
              </FormLabel>
              <RadioGroup
                name="controlled-radio-buttons-group"
                value={trackType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="album"
                  control={<Radio />}
                  label="Add to album"
                />
                <FormControlLabel
                  value="create-album"
                  control={<Radio />}
                  label="Create a new album"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              {isSingleSelected && (
                <SingleTrackForm
                  handleClose={handleClose}
                  refetchOverviewSection={refetchOverviewSection}
                />
              )}
            </Grid>
          </Grid>

          {isAlbumSelected && (
            <AddToAlbumForm
              handleClose={handleClose}
              refetchOverviewSection={refetchOverviewSection}
            />
          )}
          {isCreateAlbumSelected && (
            <CreateNewAlbumForm
              handleClose={handleClose}
              refetchOverviewSection={refetchOverviewSection}
            />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AudioDialog;

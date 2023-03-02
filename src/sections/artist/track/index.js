import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Navigate, useParams } from "react-router-dom";
import trackInstance from "src/axios/trackInstance";
import Loader from "src/components/Loader";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import EditTrackForm from "./editTrackForm";
import useSWR, { mutate } from "swr";

function TrackViewSection() {
  const { trackId } = useParams();

  const [open, setOpen] = useState(false);

  const fetchTrack = async () => {
    const response = await trackInstance.get(`/${trackId}`);

    return response.data.track;
  };

  const {
    data: track,
    error,
    isLoading,
  } = useSWR(
    `artist/tracks/${trackId}`,

    fetchTrack,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (message) => {
    if (message) {
      mutate(`artist/tracks/${trackId}`);
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
      }}
    >
      <Grid container py={7}>
        <Grid
          item
          md={3}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LazyLoadImage
            src={track?.coverImage}
            style={{
              height: "15rem",
              width: "15rem",
              objectFit: "cover",
              borderRadius: "0.8rem",
            }}
            alt={track?.title}
            effect="blur"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Stack spacing={2} py={3}>
            <Typography variant="h4" color="initial">
              {track?.title}
            </Typography>

            <Typography variant="body1" color="initial">
              {track?.albumId?.title}
            </Typography>
            <Typography variant="body1" color="initial">
              {track?.genre?.name}
            </Typography>
            <Typography variant="body1" color="initial">
              {moment.utc(track?.duration * 1000).format("mm:ss")}
            </Typography>
            <Typography variant="body1" color="initial">
              {track?.price} $
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={3} xs={12}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Edit track
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">Edit track</Typography>

            <CloseIcon
              sx={{
                cursor: "pointer",
              }}
              fontSize="medium"
              onClick={() => {
                handleClose();
              }}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <EditTrackForm handleClose={handleClose} track={track} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default TrackViewSection;

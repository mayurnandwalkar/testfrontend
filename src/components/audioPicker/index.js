import AudioDialog from "./dialog";
import { Grid, Box, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AudioUploader = ({ refetchOverviewSection }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15rem",
            width: "80%",
            border: "2px dashed #ccc",
            borderRadius: "1rem",
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            onClick={handleClickOpen}
            sx={{
              cursor: "pointer",
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 100 }} />

            <Typography variant="h6" component="div">
              Click to upload audio
            </Typography>

            <Button variant="outlined" onClick={handleClickOpen} size="medium">
              Upload
            </Button>
          </Stack>
        </Box>
      </Grid>

      <AudioDialog
        open={open}
        onClose={handleClose}
        refetchOverviewSection={refetchOverviewSection}
      />
    </Grid>
  );
};

export default AudioUploader;

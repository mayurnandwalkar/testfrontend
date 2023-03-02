import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { fDate } from "src/utils/formatTime";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DeleteOutline } from "@mui/icons-material";

import playlistInstance from "src/axios/playlistInstance";
import { Stack, Typography } from "@mui/material";

export default function PlaylistTable({ tracks, deleteTrackFromPlaylist }) {
  console.log({ tracks });
  const navigate = useNavigate();

  const handleTrackNavigation = (trackId) => {
    navigate(`/dashboard/track/${trackId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Duration</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks?.length > 0 ? (
            tracks?.map((track) => (
              <TableRow
                key={track?._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => handleTrackNavigation(track?._id)}
              >
                <TableCell component="th" scope="track">
                  <LazyLoadImage
                    src={track?.coverImage}
                    alt={track?.title}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                      borderRadius: "1rem",
                    }}
                    effect="blur"
                  />
                </TableCell>
                <TableCell component="th" scope="track">
                  {track?.title}
                </TableCell>
                <TableCell component="th" scope="track">
                  {track?.artistId?.groupName}
                </TableCell>

                <TableCell component="th" scope="track">
                  {fDate(track?.releaseDate)}
                </TableCell>
                <TableCell component="th" scope="track">
                  {track?.genre?.name}
                </TableCell>
                <TableCell component="th" scope="track">
                  {moment.utc(track.duration * 1000).format("mm:ss")}
                </TableCell>
                <TableCell component="th" scope="track">
                  <DeleteOutline
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTrackFromPlaylist(track?._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Stack spacing={2}>
                  <Typography variant="body1">No tracks found</Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Add tracks to your playlist
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

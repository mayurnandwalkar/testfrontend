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

export default function TracksTable({ tracks }) {
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
            <TableCell>Time</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No tracks found
              </TableCell>
            </TableRow>
          ) : (
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
                  {fDate(track?.releaseDate)}
                </TableCell>
                <TableCell component="th" scope="track">
                  {track?.genre?.name}
                </TableCell>
                <TableCell component="th" scope="track">
                  {track?.price} $
                </TableCell>
                <TableCell component="th" scope="track">
                  {moment.utc(track?.duration * 1000).format("mm:ss")} 
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AlbumsTable({ albums }) {
  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const handlealbumNavigation = (albumId) => {
    navigate(`/dashboard/album/${albumId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Album Name</TableCell>
            <TableCell>Artist Name</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>No. of Tracks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albums.map((album) => (
            <TableRow
              key={album._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
              onClick={() => handlealbumNavigation(album._id)}
            >
              <TableCell component="th" scope="album">
                <LazyLoadImage
                  src={album.coverImage}
                  alt={album.title}
                  style={{
                    width: isMobile ? "4rem" : "5rem",
                    height: isMobile ? "4rem" : "5rem",
                    objectFit: "cover",
                    borderRadius: isMobile ? "0.2rem" : "1rem",
                  }}
                  effect="blur"
                />
              </TableCell>
              <TableCell component="th" scope="album">
                {album.title}
              </TableCell>
              <TableCell component="th" scope="album">
                {album.artistGroupName}
              </TableCell>
              <TableCell component="th" scope="album">
                {fDate(album.releaseDate)}
              </TableCell>
              <TableCell component="th" scope="album">
                {album.genre}
              </TableCell>
              <TableCell component="th" scope="album">
                {album.trackCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

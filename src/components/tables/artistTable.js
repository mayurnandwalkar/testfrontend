import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function ArtistTable({ artists }) {
  console.log({ artists });
  const navigate = useNavigate();

  const handleArtistNavigation = (artistId) => {
    navigate(`/dashboard/artist/${artistId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artist Name</TableCell>
            <TableCell>Album Count</TableCell>
            <TableCell>Song Count</TableCell>
            <TableCell>Followers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist) => (
            <TableRow
              key={artist._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
              }}
              onClick={() => handleArtistNavigation(artist._id)}
            >
              <TableCell component="th" scope="artist">
                {artist.groupName}
              </TableCell>
              <TableCell component="th" scope="artist">
                {artist.albumCount}
              </TableCell>
              <TableCell component="th" scope="artist">
                {artist.trackCount}
              </TableCell>
              <TableCell component="th" scope="artist">
                {artist.followerCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import { useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import SearchTabs from "./tabs";
import searchInstance from "src/axios/searchInstance";

const SearchSection = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({
    albums: [],
    artists: [],
    tracks: [],
  });
  const [isSearched, setIsSearched] = useState(false);

  const handleSearchText = async (e) => {
    const response = await searchInstance.get(`/?searchQuery=${searchText}`);

    console.log(response.data.data);
    setSearchResults(response.data.data);
    setIsSearched(true);
  };

  return (
    <Grid
      container
      spacing={2}
      p={{
        xs: 1,
        sm: 2,

        md: 5,
      }}
    >
      <Grid item md={12}>
        <Grid container spacing={2}>
          {/* <Grid item></Grid> */}
          <Grid item md={12}>
            <Stack spacing={2} direction="row">
              <TextField
                fullWidth
                name="search"
                size="large"
                type="text"
                variant="outlined"
                placeholder="Search for artists, albums, etc"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                sx={{
                  input: {
                    color: "black",
                    background: "white",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearchText}
                disabled={searchText.length === 0}
              >
                Search
              </Button>
            </Stack>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Grid>

      {isSearched && (
        <Grid item md={12}>
          <SearchTabs searchResults={searchResults} />
        </Grid>
      )}
    </Grid>
  );
};

export default SearchSection;

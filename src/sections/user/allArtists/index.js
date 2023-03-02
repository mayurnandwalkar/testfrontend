import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";
import ArtistTable from "src/components/tables/artistTable";
import artistInstance from "src/axios/artistInstance";

import useSWR from "swr";
import Loader from "src/components/Loader";

const ArtistsViewSection = () => {
  const navigate = useNavigate();

  const fetchArtists = async () => {
    const response = await artistInstance.get("/");

    return response.data;
  };

  const { data, error, isLoading } = useSWR("/fetch-artists", fetchArtists);

  console.log("Data", data);
  const handleArtistNavigation = (artistId) => {
    navigate(`/dashboard/artist/${artistId}`);
  };

  if (error) return <div>Failed to fetch users.</div>;
  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
      }}
    >
      <Grid
        container
        py={7}
        px={{
          xs: 2,
          sm: 2,
          md: 4,
        }}
        spacing={3}
      >
        <Grid item md={12} display="flex" justifyContent="center">
          <Typography variant="h4" fontWeight="bold">
            All Artists
          </Typography>
        </Grid>
        <Grid item md={12} xs={12} display="flex" justifyContent="center">
          <ArtistTable
            handleArtistNavigation={handleArtistNavigation}
            artists={data?.artists}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistsViewSection;

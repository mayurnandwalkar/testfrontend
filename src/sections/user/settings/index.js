import UpdateProfileForm from "./updateProfileForm";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Settings = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        borderRadius: "1rem",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item md={8}>
        <UpdateProfileForm />
      </Grid>
    </Grid>
  );
};

export default Settings;

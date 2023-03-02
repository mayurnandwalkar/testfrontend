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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      p={{
        xs: 1,
        md: 2,
      }}
    >
      <Grid item md={4} xs={12}>
        <UpdateProfileForm />
      </Grid>
    </Grid>
  );
};

export default Settings;

import { Grid, Button, Typography, Stack } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Payout = ({ handleOnboarding }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <Grid item md={3} xs={12}>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <AccountBalanceIcon
            sx={{ fontSize: 50, marginRight: "10px", color: "#116dff" }}
          />
          <Typography variant="h4" component="h4" align="center">
            Set up payouts to list on Merchpals
          </Typography>
          <Typography variant="p" component="p" align="center">
            Merchpals partners with stripe to transfer earnings to your bank
            account
          </Typography>
          <Button
            onClick={handleOnboarding}
            variant="contained"
            size="large"
            fullWidth
          >
            Set up payouts
          </Button>
          <Typography variant="p" component="p" align="center" fontSize="small">
            You will be redirected to stripe to complete the onboarding process
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Payout;

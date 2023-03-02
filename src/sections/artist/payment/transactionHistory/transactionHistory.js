import {
  Grid,
  Button,
  Typography,
  Stack,
  Modal,
  Box,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stripeInstance from "src/axios/stripeInstance";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem 14rem",
  },
  card: {
    borderRadius: "5px",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.2)",
  },
  buttonText: {
    color: "#116dff",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "medium",
  },
  payoutButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "light",
  },
  balance: {
    fontSize: "1.5rem",
    fontWeight: "light",
  },

  payoutButton: {
    marginBottom: "10px",
  },
  tableHeading: {
    fontSize: "1.2rem",
    fontWeight: "medium",
  },
  topText: {
    fontSize: "0.9rem",
    fontWeight: "light",
  },
  lightText: {
    color: "#8e8e8e",
    fontSize: "0.8rem",
  },
  tableColumnHeading: {
    fontSize: "1rem",
  },
  tableRow: {
    height: "50px",
    // [theme.breakpoints.down("sm")]: {
    //   height: "40px",
    // },
  },
  tableLightText: {
    color: "#8e8e8e",
    fontSize: "0.9rem",
  },
}));

const baseURL = process.env.REACT_APP_BASE_URL;

const TransactionHistory = ({
  hasStripeAcc,

  vendor,
  initiatePayout,
  handleViewStripeDashboard,
  pendingBalance,
  transactionHistory,
  setHasStripeAcc,
  handleOnboarding,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [removeStatus, setRemoveStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const callCronJob = () => {
    axios
      .get(`${baseURL}/cron-job`)
      .then((response) => {
        alert("Escrow payment released successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveStripeAccount = () => {
    setLoading(true);
    stripeInstance
      .delete("/account")
      .then((response) => {
        // handleOnboarding();
        // setHasStripeAcc(false);
        handleClose();
        setLoading(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const removeAndHandleViewStripeDashboard = () => {
    handleRemoveStripeAccount();
  };

  const handleVerifyRemoveName = (e) => {
    //  setStoreName(e.target.value);
    //  const name = e.target.value.trim();

    if (e.target.value === "Remove_Stripe_Account") {
      setRemoveStatus(true);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Grid
      container
      spacing={2}
      py={{
        xs: 2,
        md: 1,
      }}
      px={{
        xs: 2,
        md: 14,
      }}
    >
      <Grid item md={12} xs={12}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2}>
                <Typography variant="body1" color="initial">
                  Lifetime Profit
                </Typography>

                <Typography variant="body1" color="initial">
                  To be Payed
                </Typography>
                <Typography variant="body1" color="initial">
                  Ready to Payout
                </Typography>
              </Stack>
              <Stack direction="column" spacing={2}>
                <Typography variant="body" color="initial">
                  $0.00
                </Typography>
                <Typography variant="body1" color="initial">
                  ${pendingBalance?.pendingBalance.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="initial">
                  ${vendor?.balance.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack
              direction="column"
              spacing={3}
              justifyContent="space-between"
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.payoutButton}
                onClick={
                  hasStripeAcc
                    ? removeAndHandleViewStripeDashboard
                    : handleOnboarding
                }
                // onClick={removeAndHandleViewStripeDashboard}
              >
                {hasStripeAcc ? "Change Bank" : "Setup Bank"}
              </Button>
              {/* <Typography onClick={handleOpen} className={classes.buttonText}>
                Remove account
              </Typography> */}
              <Stack direction="column" spacing={1}>
                <Button
                  onClick={initiatePayout}
                  disabled={!vendor.balance > 0}
                  fullWidth
                  className={classes.payoutButton}
                  variant="contained"
                  color="primary"
                >
                  Payout Now
                </Button>
                <Typography
                  className={classes.buttonText}
                  onClick={handleViewStripeDashboard}
                  align="center"
                >
                  View Payouts History
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{}} mb={1}>
            <Typography variant="h6" component="h2">
              Are you absolutely sure?
            </Typography>
          </Box>
          <Divider />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mt={3}
            mb={2}
          >
            Please type{" "}
            <span style={{ color: "red" }}>Remove_Stripe_Account</span> to
            confirm.
          </Typography>
          <TextField
            label="Remove Account"
            // className={[classes.textfield, classes.storeNameField].join(' ')}
            fullWidth
            size="small"
            onChange={handleVerifyRemoveName}
            inputProps={{
              autocomplete: "off",
              form: {
                autocomplete: "off",
              },
            }}
          />
          <Button
            onClick={handleRemoveStripeAccount}
            disabled={!removeStatus}
            fullWidth
            className={classes.payoutButton}
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
          >
            {loading ? (
              <CircularProgress size="2rem" color="inherit" />
            ) : (
              "Remove Account"
            )}
          </Button>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </Grid>
  );
};

export default TransactionHistory;

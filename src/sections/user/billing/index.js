import { useState, useEffect } from "react";

import { Box, Button, Container, Grid, Typography, Stack } from "@mui/material";

import subscriptionInstance from "src/axios/subscriptionInstance";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import AlertDialog from "src/components/dialog";
import { hideLoader } from "src/store/actions/loaderActions";
import { useDispatch } from "react-redux";

const BillingSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSubscription();

    return () => {
      setSubscription({});
    };
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionInstance.get("/");
      console.log(response.data.subscription);

      dispatch(hideLoader());
      if (
        !response.data.subscription ||
        response.data.subscription.status === "canceled"
      ) {
        navigate("/dashboard/pricing");
      } else {
        setSubscription(response.data.subscription);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelSubscription = async () => {
    try {
      const response = await subscriptionInstance.post("/cancel-subscription");
      console.log(response.data.message);
      handleClose();
      fetchSubscription();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item lg={12} md={12} xs={12}>
          <Typography color="textPrimary" variant="h2">
            Billing
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    Package
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    {subscription?.package}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    Type
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    color="textPrimary"
                    variant="body1"
                    sx={{
                      "&::firstletter": {
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    {subscription?.type}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1" fullWidth>
                    Start date
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    {moment(subscription?.startDate).format(
                      "dddd, MMMM Do YYYY"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  {" "}
                  <Typography color="textPrimary" variant="body1">
                    Next billing date
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    {moment(subscription?.renewalDate).format(
                      "dddd, MMMM Do YYYY"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    Monthly download limit
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    {subscription?.monthlyLimit
                      ? subscription?.monthlyLimit
                      : "Unlimited"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  {" "}
                  <Typography color="textPrimary" variant="body1">
                    Remaining download limit
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography color="textPrimary" variant="body1">
                    {subscription?.remainingLimit !== null
                      ? subscription?.remainingLimit
                      : "Unlimited"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Stack direction="row" spacing={5}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/dashboard/pricing");
              }}
            >
              Upgrade subscription
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Cancel subscription
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <AlertDialog
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        title="Are you sure you want to cancel your subscription?"
        content="You will not be able to download any more tracks until you upgrade your subscription"
        action="Cancel subscription"
        handleAction={cancelSubscription}
      />
    </Container>
  );
};

export default BillingSection;

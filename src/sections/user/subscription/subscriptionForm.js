import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import subscriptionInstance from "src/axios/subscriptionInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SubscriptionForm({ subscriptionId, plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    console.log(error, paymentIntent);

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message);
    } else if (paymentIntent) {
      try {
        const response = await subscriptionInstance.post(
          "/create-subscription",
          {
            subscriptionId,
            paymentIntent,
          }
        );

        const toastId = toast.info("Subscribed successfully...");

        toast.update(toastId, {
          render: "Subscribed successfully...",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        navigate("/dashboard", { replace: true });

        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Grid sx={{ mt: 3 }} container spacing={10} justifyContent="center">
      <Grid item xs={12} justifyContent="center">
        <Typography variant="h4" gutterBottom textAlign="center">
          Checkout
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              loadingPosition="start"
              loadingIndicator="Processing"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Pay
            </LoadingButton>
            {message && (
              <Typography variant="body2" color="error" gutterBottom>
                {message}
              </Typography>
            )}
          </form>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Typography variant="h5" gutterBottom>
          Subscription Details
        </Typography>
        <Grid container spacing={2} pt={4}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Package</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{plan.title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Type</Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {plan.type}
                </Typography>{" "}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Total Price</Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Typography>$ {plan.price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

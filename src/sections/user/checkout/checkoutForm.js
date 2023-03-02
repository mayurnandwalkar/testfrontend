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
import paymentInstance from "src/axios/paymentInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "src/store/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const tracks = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const total = tracks?.reduce((sum, obj) => {
    const total = sum + parseFloat(obj.price);
    return total;
  }, 0);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

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

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message);
    } else if (paymentIntent) {
      try {
        const data = {
          tracks,
          paymentIntent,
        };

        const response = await paymentInstance.post("/create-order", data);

        const toastId = toast.loading("Tracks purchased successfully...");
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        dispatch(clearCart());
        navigate("/dashboard");
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
    <Grid
      sx={{ mt: 3 }}
      container
      spacing={{
        xs: 3,
        md: 10,
      }}
      justifyContent="center"
    >
      <Grid item xs={12} justifyContent="center">
        <Typography variant="h4" gutterBottom textAlign="center">
          Checkout
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
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
      <Grid item md={4} xs={12}>
        <Typography variant="h5" gutterBottom>
          Order summary
        </Typography>
        <Stack spacing={2} mt={3}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Number of tracks</Typography>
            <Typography>{tracks?.length}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Subtotal</Typography>
            <Typography>$ {total}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography>Tax</Typography>
            <Typography>$ 0</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography>$ {total}</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

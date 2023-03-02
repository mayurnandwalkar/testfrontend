import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "src/sections/user/checkout/checkoutForm";
import paymentInstance from "src/axios/paymentInstance";
import { list } from "cart-localstorage";

import { Grid } from "@mui/material";
import Page from "src/components/Page";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51MCVmOKgRPqVukPEoTZsxYmt0Uw4p35zXdQIrZJiSN2BgF8JyXpNvneQniaNhXr7t9h6qEjbhC7yQewUCcvJttqZ00zeGkyLZp"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret = async () => {
    const tracks = list();
    const response = await paymentInstance.post(
      "/create-payment-intent",
      tracks
    );
    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "flat",
    variables: {
      colorPrimary: "#151fcd",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Page title="AX3 | checkout">
      <Grid container p={5}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Grid>
    </Page>
  );
}

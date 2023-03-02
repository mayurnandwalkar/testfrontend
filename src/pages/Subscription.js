import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Page from "src/components/Page";

import SubscriptionForm from "src/sections/user/subscription/subscriptionForm";
import { list } from "cart-localstorage";
import { useLocation } from "react-router-dom";
import subscriptionInstance from "src/axios/subscriptionInstance";

import { Grid } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51MCVmOKgRPqVukPEoTZsxYmt0Uw4p35zXdQIrZJiSN2BgF8JyXpNvneQniaNhXr7t9h6qEjbhC7yQewUCcvJttqZ00zeGkyLZp"
);

export default function Subscription() {
  const [clientSecret, setClientSecret] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const location = useLocation();
  const { plan } = location.state;

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret = async () => {
    const response = await subscriptionInstance.post(
      "/create-subscription-intent",
      plan
    );
    setClientSecret(response.data.clientSecret);

    if (response.data.subscriptionId) {
      setSubscriptionId(response.data.subscriptionId);
    }
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
    <Page title="AX3 | Subscription">
      <Grid container p={5}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <SubscriptionForm subscriptionId={subscriptionId} plan={plan} />
          </Elements>
        )}
      </Grid>
    </Page>
  );
}

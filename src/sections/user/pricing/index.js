import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";

const subscriptions = [
  {
    id: "basic",
    title: "Basic",
    monthlyPrice: "4.95",
    yearlyPrice: "55.98",
    description: [
      "Ad free full previews",
      "10hrs streaming random playlist by genre(then ads kick in)",
      "10 songs a month downloads - pay per download after",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    id: "standard",
    title: "Standard",
    monthlyPrice: "9.98",
    yearlyPrice: "114.95",
    description: [
      "Full song previews without ads",
      "Unlimited single streaming randomized playlist",
      "22 songs a month downloads - pay per download after",
    ],
    buttonText: "Get started",
    buttonVariant: "outlined",
  },
  {
    id: "ax3Lifer",
    title: "AX3 Lifer",
    lifetimePrice: "449.95",
    description: [
      "Full song previews without ads",
      "Unlimited single streaming randomized playlist",
      "Unlimited downloads",
      "Lifetime subscription to AX3.com as long",
    ],
    buttonText: "Get started",
    buttonVariant: "outlined",
  },
];

export default function PricingSection() {
  const navigate = useNavigate();

  const [subscriptionType, setSubscriptionType] = useState("monthly");

  const navigateToSubscription = (subscription) => {
    if (subscription.id === "ax3Lifer") {
      const plan = {
        name: subscription.id,
        price: subscription.lifetimePrice,
        interval: "lifetime",
        type: "lifetime",
        title: subscription.title,
      };
      console.table(plan);

      navigate("/dashboard/subscriptions/checkout", {
        state: { plan },
      });

      return;
    }

    const plan = {
      name: subscription.id,
      interval: subscriptionType === "monthly" ? "month" : "year",
      title: subscription.title,
      type: subscriptionType === "monthly" ? "monthly" : "yearly",
      price:
        subscriptionType === "monthly"
          ? subscription.monthlyPrice
          : subscription.yearlyPrice,
    };

    navigate("/dashboard/subscriptions/checkout", {
      state: { plan },
    });
  };

  return (
    <Container>
      <Grid container spacing={2} my={3}>
        <Grid item md={6}>
          <Typography variant="h2" align="left" color="primary.main">
            Pricing
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              borderRadius: "0.8rem",
              border: "1px solid #e0e0e0",
              padding: "1rem",
            }}
          >
            <Button
              variant={subscriptionType === "monthly" ? "contained" : "text"}
              onClick={() => setSubscriptionType("monthly")}
              size="large"
            >
              Monthly
            </Button>
            <Button
              variant={subscriptionType === "yearly" ? "contained" : "text"}
              onClick={() => setSubscriptionType("yearly")}
              size="large"
            >
              Yearly
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {subscriptions.map((subscription) => (
          <Grid item lg={4} sm={12} xl={4} xs={12}>
            <Card sx={{ height: "40rem" }}>
              <CardContent
                sx={{
                  height: "100%",
                }}
              >
                <Stack
                  sx={{ p: 3 }}
                  spacing={3}
                  direction="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Typography align="center" variant="h3">
                    {subscription.title}
                  </Typography>
                  {subscription.lifetimePrice ? (
                    <Typography align="left" color="textPrimary" variant="h5">
                      ${subscription.lifetimePrice}
                    </Typography>
                  ) : subscriptionType === "monthly" ? (
                    <Stack Stack>
                      <Typography align="left" color="textPrimary" variant="h4">
                        ${subscription.monthlyPrice}
                      </Typography>
                      <Typography
                        align="left"
                        color="textPrimary"
                        variant="body1"
                      >
                        / month
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack Stack>
                      <Typography align="left" color="textPrimary" variant="h4">
                        ${subscription.yearlyPrice}
                      </Typography>

                      <Typography
                        align="left"
                        color="textPrimary"
                        variant="body1"
                      >
                        / year
                      </Typography>
                    </Stack>
                  )}
                  <List>
                    {subscription.description.map((item) => (
                      <ListItem disablePadding>
                        <ListItemIcon>
                          <DoneIcon
                            sx={{
                              fontSize: "1.5rem",
                              color: "primary.main",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={subscription.buttonVariant}
                    color="primary"
                    onClick={() => {
                      navigateToSubscription(subscription);
                    }}
                  >
                    Get started
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

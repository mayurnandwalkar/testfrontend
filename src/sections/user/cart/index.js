import React from "react";
import { list } from "cart-localstorage";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "src/store/actions/cartActions";
import { useNavigate } from "react-router-dom";

const CartSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = list();

  const renderCartItems = () => {
    return cart.map((item) => {
      return (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item.price}$
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                }}
              >
                Remove from cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  const navigateToCheckout = () => {
    navigate("/dashboard/checkout");
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">Cart</Typography>
            {cart.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={navigateToCheckout}
              >
                Proceed to checkout
              </Button>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Grid container spacing={4}>
            {cart.length > 0 ? (
              renderCartItems()
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6">Cart is empty</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartSection;

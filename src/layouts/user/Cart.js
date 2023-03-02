import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  return (
    <Badge
      badgeContent={cart.length > 0 ? cart.length : "0"}
      color="secondary"
      onClick={() => {
        navigate("/dashboard/cart");
      }}
      sx={{
        cursor: "pointer",
      }}
    >
      <ShoppingCart color="action" fontSize="large" />
    </Badge>
  );
};

export default Cart;

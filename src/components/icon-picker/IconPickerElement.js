import { styled } from "@mui/material/styles";
import { Button, Card, Typography, IconButton } from "@mui/material";

export const IconContainer = styled(Card)(({ theme }) => ({
  border: "1px solid black",
  width: "200px",
  height: "250px",
  padding: ".5rem",
  top: "100%",
  position: "absolute",
  zIndex: "1000",
  borderRadius: "10px",
  overflowY: "scroll",
}));

export const IconSelectButton = styled(Button)(({ theme, btncolor }) => ({
  background: "white",
  height: "60px",
  width: "100%",
  border: "1px solid #D8DDE1",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  color: btncolor,
}));

export const IconButtonLabel = styled(Typography)(({ theme }) => ({
  marginRight: "1rem",
  fontWeight: "bold",
}));
export const IconWrapper = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    background: theme.palette.primary.light,
  },
}));

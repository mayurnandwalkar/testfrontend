// @mui
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import Page from "../components/Page";
// sections
import ForgotPasswordForm from "src/sections/auth/login/ForgotPasswordForm";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  return (
    <Page title="AX3 | Forgot Password">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <ForgotPasswordForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

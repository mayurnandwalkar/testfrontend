// @mui
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import Page from "../components/Page";
import ResetPasswordForm from "src/sections/auth/login/PasswordResetForm";

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

export default function ResetPassword() {
  return (
    <Page title="AX3 | Reset Password">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <ResetPasswordForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

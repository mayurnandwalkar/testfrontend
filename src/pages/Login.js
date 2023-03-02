// @mui
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import Page from "../components/Page";
// sections
import { LoginForm } from "../sections/auth/login";

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

export default function Login() {
  return (
    <Page title="AX3 | Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

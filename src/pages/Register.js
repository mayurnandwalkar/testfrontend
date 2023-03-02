// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
// sections
import { RegisterForm } from "../sections/auth/register";
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

export default function Register() {
  return (
    <Page title="AX3 | Register">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>            
            <Typography align="center" variant="h3"  sx={{ m: 1 }}>Fan Registration</Typography>
            <RegisterForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

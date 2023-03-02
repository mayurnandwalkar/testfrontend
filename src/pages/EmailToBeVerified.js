// @mui
import { styled } from "@mui/material/styles";
import { Container, Stack, Typography, Box } from "@mui/material";
// components
import Page from "../components/Page";
// sections
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

export default function EmailToBeVerified() {
  return (
    <Page title="AX3 | Verify Email">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" marginBottom="3rem" color="#8C30F5">
                Please head over to your email box and verify your email
                address.
              </Typography>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

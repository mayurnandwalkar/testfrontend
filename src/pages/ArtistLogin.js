// @mui
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
// components
import Page from "../components/Page";
import ArtistLoginForm from "src/sections/auth/login/ArtistLoginForm";
// sections


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
const ArtistLogin = () => {
    return (
        <>
            <Page title="AX3 | Login">
                <RootStyle>
                    <Container maxWidth="sm">
                        <ContentStyle>
                            <ArtistLoginForm/>
                         </ContentStyle>
                    </Container>
                </RootStyle>
            </Page>
        </>
    )
}

export default ArtistLogin
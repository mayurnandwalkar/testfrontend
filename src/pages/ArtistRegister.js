 import { styled } from "@mui/material/styles";
 import { Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import React from 'react'
import ArtishRegsiterForm from 'src/sections/auth/register/ArtishRegsiterForm';
 
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

const ArtistRegister = () => {
    return (
        <>
            <Page title="AX3 | Register">
                <RootStyle>
                    <Container maxWidth="sm">
                        <ContentStyle>                            
                            <Typography align="center" variant="h3"  sx={{ m: 1 }}>Artist Registration</Typography>
                            <ArtishRegsiterForm />
                        </ContentStyle>
                    </Container>
                </RootStyle>
            </Page>
        </>
    )
}

export default ArtistRegister
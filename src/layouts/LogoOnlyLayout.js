import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { Fragment, useState } from "react";
import { Stack, Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "src/store/actions/authActions";
import { SelectSignupModel } from "src/models/SelectSignupModel";
import SelectLoginModel from "src/models/SelectLoginModel";

const AuthSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Stack direction="row" spacing={2}>
      {/* <Button onClick={() => { navigate("/login"); }} >Login</Button> */}
      <SelectLoginModel/>
      {/* <Button onClick={() => { navigate("/signup"); }}>Register</Button> */}
      <SelectSignupModel />
    </Stack>
  );
};

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Box
        sx={{
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent:
            location.pathname === "/" ? "space-between" : "center",
          height: "10vh",
        }}
        px={{
          xs: location.pathname === "/" ? 2 : 0,
          md: location.pathname === "/" ? 6 : 0,
        }}
      >
        <Logo />
        {location.pathname === "/artist-onboarding" && (
          <Button
            sx={{
              marginLeft: "auto",
            }}
            onClick={() => {
              dispatch(signOut());
            }}
          >
            Logout
          </Button>
        )}
        {location.pathname === "/" ? <AuthSection /> : null}
      </Box>
      <Outlet />
    </Fragment>
  );
}

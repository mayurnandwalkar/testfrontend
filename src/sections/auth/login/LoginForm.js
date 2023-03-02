import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import WarningDialog from "./warningDialogs/dialog";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../../../store/actions/authActions";

import { authErrors } from "src/utils/constants";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [authError, setAuthError] = useState({
    title: "",
    content: "",
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const user = await dispatch(signIn(values));

        if (user.status === "Blocked") {
          setAuthError({
            title: authErrors.blocked.title,
            content: authErrors.blocked.content,
          });
          handleOpen();
          return;
        }

        if (user.status === "Suspended") {
          setAuthError({
            title: authErrors.suspended.title,
            content: authErrors.suspended.content,
          });

          handleOpen();
          return;
        }
      } catch (err) {
        setErrors({ error: err.response.data.message });
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
            pb={4}
          >
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="/signup"
              underline="hover"
            >
              Don't have an account? Sign up
            </Link>
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="/forgot-password"
              underline="hover"
            >
              Forgot password?
            </Link>
          </Stack>
          {formik.errors.error && (
            <FormHelperText style={{ color: "#ff3333", marginBottom: "2rem" }}>
              {formik.errors.error}
            </FormHelperText>
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
      <WarningDialog
        open={open}
        handleClose={handleClose}
        title={authError.title}
        content={authError.content}
      />
    </>
  );
}

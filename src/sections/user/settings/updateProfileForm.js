import { useState } from "react";

import {
  Grid,
  Typography,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import authInstance from "src/axios/authInstance";
import { updateProfile } from "src/store/actions/authActions";
import Iconify from "../../../components/Iconify";

import { toast } from "react-toastify";

const UpdateProfileForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string(),

    lastName: Yup.string(),

    password: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain 8 Characters, one uppercase, One lowercase, one number and one special case character"
      ),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        dispatch(updateProfile(values));

        const toastId = toast.loading("processing");

        toast.update(toastId, {
          render: "Profile updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom mb={5}>
              Account
            </Typography>

            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      My name
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Stack spacing={2} direction="row">
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="First name"
                        variant="outlined"
                        size="small"
                        {...getFieldProps("firstName")}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="Last name"
                        variant="outlined"
                        size="small"
                        {...getFieldProps("lastName")}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Stack>
                  </Grid>
                  <Grid item md={2}></Grid>
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <Grid container spacing={2} display="flex" alignItems="center">
                  <Grid item md={3} xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      placeholder="Email address"
                      variant="outlined"
                      size="small"
                      disabled
                      value={user.email}
                    />
                  </Grid>
                  <Grid item md={2}></Grid>
                </Grid>
              </Grid>{" "}
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Password
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        size="small"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        {...getFieldProps("password")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showPassword
                                      ? "eva:eye-fill"
                                      : "eva:eye-off-fill"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        autoComplete="confirm-password"
                        type={showPassword ? "text" : "password"}
                        label="Confirm password"
                        {...getFieldProps("confirmPassword")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                <Iconify
                                  icon={
                                    showPassword
                                      ? "eva:eye-fill"
                                      : "eva:eye-off-fill"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item md={2}></Grid>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <LoadingButton
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={
                    (values.firstName === user.firstName &&
                      values.lastName === user.lastName &&
                      values.password === "" &&
                      values.confirmPassword === "") ||
                    values.password !== values.confirmPassword
                  }
                >
                  Update
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default UpdateProfileForm;

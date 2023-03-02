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
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";

// redux
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/actions/authActions";
import moment from "moment";


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),

    lastName: Yup.string().required("Last name is required"),
    phoneNo: Yup.string().required("Phone number is required"),

    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    // role: Yup.string().required("Role is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain 8 Characters, one uppercase, One lowercase, one number and one special case character"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm the password"),

    dateOfBirth: Yup.date()
      .required("Please enter your date of birth")
      .when("role", {
        is: "Artist",
        then: Yup.date().test(
          "dateOfBirth",
          "You must be 18 years old to continue as an artist",
          (value) => {
            return moment().diff(moment(value), "years") >= 18;
          }
        ),
        otherwise: Yup.date().test(
          "dateOfBirth",
          "You must be 13 years old to continue as a fan",
          (value) => {
            return moment().diff(moment(value), "years") >= 13;
          }
        ),
      }),
    hasAcceptedTerms: Yup.boolean().oneOf(
      [true],
      "Please accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      // role: "",
      dateOfBirth: "",
      hasAcceptedTerms: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const res = await dispatch(signUp({
          "dateOfBirth": values.dateOfBirth,
          "firstName": values.firstName,
          "lastName": values.lastName,
          "email": values.email,
          "password": values.password,
          "confirmPassword": values.confirmPassword,
          "phoneNo": values.phoneNo,
          "hasAcceptedTerms": values.hasAcceptedTerms,
          "role": "Customer"
        }));
        console.log("res", res);
        if (!res) {
          navigate("/email-to-verify", { replace: true });
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

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                autoComplete="firstName"
                fullWidth
                type="text"
                label="First Name"
                {...getFieldProps("firstName")}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                autoComplete="lastName"
                type="text"
                fullWidth
                label="Last Name"
                {...getFieldProps("lastName")}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="username"
              type="number"
              label="Phone Number"
              {...getFieldProps("phoneNo")}
              error={Boolean(touched.phoneNo && errors.phoneNo)}
              helperText={touched.phoneNo && errors.phoneNo}
            />

            {/* <Grid container justifyContent="center" alignItems="center">
              <Grid item md={6} sm={6} xs={12} style={{ textAlign: "left" }}>
                <Typography variant="body1" fullWidth>
                  How do you want to use the app?
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  fullWidth
                  select={true}
                  label="Role"
                  {...getFieldProps("role")}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                >
                  <MenuItem value="Artist">Artist</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Customer" selected>Fan</MenuItem>

                </TextField>
              </Grid>
            </Grid> */}
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              {...getFieldProps("dateOfBirth")}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
                        icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
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
              autoComplete="confirm-password"
              type={showPassword ? "text" : "password"}
              label="Confirm password"
              {...getFieldProps("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify
                        icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <FormControlLabel
              control={
                <Checkbox
                  {...getFieldProps("hasAcceptedTerms")}
                  checked={values.hasAcceptedTerms}
                />
              }
              label="I have read and agree to the terms of service."
            />
            {Boolean(touched.hasAcceptedTerms && errors.hasAcceptedTerms) && (
              <FormHelperText error>{errors.hasAcceptedTerms}</FormHelperText>
            )}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
            pb={3}
          >
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="/login"
              underline="hover"
            >
              Already have an account? Login
            </Link>
          </Stack>
          {formik.errors.error && (
            <FormHelperText style={{ color: "#ff3333", marginBottom: "3rem" }}>
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
            Register
          </LoadingButton>
        </Form>
      </FormikProvider>

    </>
  );
}

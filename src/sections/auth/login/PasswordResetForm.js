import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  Card,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import authInstance from "src/axios/authInstance";

// ----------------------------------------------------------------------

const ErrorContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  padding: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const ErrorDetail = styled(Typography)(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  marginTop: "2rem",
  lineHeight: "1.5rem",
  color: theme.palette.primary.main,
}));

//-----------------------------------------------------------------------
export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authInstance.post(`/verify-token`, {
          token: token,
        });
        setIsTokenValid(true);
        setLoading(false);
      } catch (error) {
        setIsTokenValid(false);
        setLoading(false);
      }
    };
    verifyToken();
    // eslint-disable-next-line
  }, [token]);

  const LoginSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        await authInstance.patch(`/reset-password/${token}`, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
        setIsTokenValid(false);
        setErrors({ error: error.response.data.message });
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={80} sx={{ alignSelf: "center" }} />
      ) : isTokenValid ? (
        <Box>
          <Typography variant="h4" marginBottom="3rem" color="primary">
            Reset Password
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3} marginBottom="2rem">
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

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Confirm Password"
                  {...getFieldProps("confirmPassword")}
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
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Reset
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      ) : (
        <ErrorContainer>
          <Iconify icon="flat-color-icons:expired" width={60} height={60} />
          <ErrorDetail>
            It seems either your link has been expired or you have already
            visited this link. If you want to reset your password go to forgot
            password and enter your email.Thank You!
          </ErrorDetail>
        </ErrorContainer>
      )}
    </>
  );
}

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import genreInstance from "src/axios/genreInstance";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { artistOnboarding } from "src/store/actions/authActions";

// ----------------------------------------------------------------------

export default function OnBoardingForm() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userID);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");
    setGenres(response.data.genres);
  };

  const LoginSchema = Yup.object().shape({
    artistBio: Yup.string().required("Please tell us about yourself"),
    // primaryGenre: Yup.string().required("Primary genre is required"),
    secondaryGenre: Yup.string(),
    profilePicture: Yup.mixed().required("Profile picture is required"),
    bannerImage: Yup.mixed().required("Banner image is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Region is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.number().required("Zip code is required"),
    type: Yup.string().required("How do you want to be known?"),
    groupName: Yup.string().required("Group name is required"),
  });

  const formik = useFormik({
    initialValues: {
      artistBio: "",
      primaryGenre: "",
      secondaryGenre: "",
      profilePicture: "",
      bannerImage: "",
      type: "",
      groupName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("userId", userID);
        formData.append("bio", values.artistBio);
        formData.append("primaryGenre", values.primaryGenre);
        formData.append("secondaryGenre", values.secondaryGenre);
        formData.append("profilePicture", values.profilePicture);
        formData.append("bannerImage", values.bannerImage);
        formData.append("type", values.type);
        formData.append("groupName", values.groupName);
        const address = {
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
          zipCode: values.zipCode,
        };

        formData.append("address", JSON.stringify(address));

        await dispatch(artistOnboarding(formData));

        navigate("/artist", { replace: true });
      } catch (err) {
        console.error(err);
        setErrors({ error: err.response.data.message });
      }
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} my={3}>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Bio"
            {...getFieldProps("artistBio")}
            error={Boolean(touched.artistBio && errors.artistBio)}
            helperText={touched.artistBio && errors.artistBio}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select={true}
              label="Type"
              {...getFieldProps("type")}
              error={Boolean(touched.type && errors.type)}
              helperText={touched.type && errors.type}
            >
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="text"
              label="Group Name"
              {...getFieldProps("groupName")}
              error={Boolean(touched.groupName && errors.groupName)}
              helperText={touched.groupName && errors.groupName}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select={true}
              label="Primary Genre"
              {...getFieldProps("primaryGenre")}
              error={Boolean(touched.primaryGenre && errors.primaryGenre)}
              helperText={touched.primaryGenre && errors.primaryGenre}
            >
              {genres
                .filter((genre) => genre._id !== values.secondaryGenre)
                .map((genre) => (
                  <MenuItem value={genre._id}>{genre.name}</MenuItem>
                ))}
            </TextField>
            <TextField
              fullWidth
              select={true}
              label="Secondary Genre"
              {...getFieldProps("secondaryGenre")}
              error={Boolean(touched.secondaryGenre && errors.secondaryGenre)}
              helperText={touched.secondaryGenre && errors.secondaryGenre}
            >
              {genres
                .filter((genre) => genre._id !== values.primaryGenre)
                .map((genre) => (
                  <MenuItem value={genre._id}>{genre.name}</MenuItem>
                ))}
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Stack spacing={1} width="50%">
              <Button variant="outlined" fullWidth component="label">
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  value=""
                  hidden
                  onChange={(e) => {
                    setFieldValue("profilePicture", e.target.files[0]);
                  }}
                />
              </Button>
              <Typography variant="body2" color="textSecondary">
                {values?.profilePicture?.name}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                pl={2}
                sx={{
                  color: "red",
                }}
              >
                {errors?.profilePicture}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                pl={2}
                sx={{
                  color: "gray",
                }}
              >
                Recommended size: 300x300
              </Typography>
            </Stack>
            <Stack spacing={1} width="50%">
              <Button variant="outlined" component="label" fullWidth>
                Upload Banner Image
                <input
                  type="file"
                  accept="image/*"
                  value=""
                  hidden
                  onChange={(e) => {
                    setFieldValue("bannerImage", e.currentTarget.files[0]);
                  }}
                />
              </Button>
              <Typography variant="body2" color="textSecondary">
                {values?.bannerImage?.name}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                pl={2}
                sx={{
                  color: "red",
                }}
              >
                {errors?.bannerImage}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                pl={2}
                sx={{
                  color: "gray",
                }}
              >
                Recommended size: 1600x400
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2}>
            <TextField
              fullWidth
              type="text"
              label="Street"
              {...getFieldProps("street")}
              error={Boolean(touched.street && errors.street)}
              helperText={touched.street && errors.street}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                type="text"
                label="City"
                {...getFieldProps("city")}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
              />
              <TextField
                fullWidth
                type="text"
                label="State/Region"
                {...getFieldProps("state")}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                type="number"
                label="Zip Code"
                {...getFieldProps("zipCode")}
                error={Boolean(touched.zipCode && errors.zipCode)}
                helperText={touched.zipCode && errors.zipCode}
              />
              <TextField
                fullWidth
                type="text"
                label="Country"
                {...getFieldProps("country")}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country}
              />
            </Stack>
          </Stack>
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
          // disabled={errors}
        >
          Continue
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

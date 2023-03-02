import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import artistInstance from "src/axios/artistInstance";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Stack,
  TextField,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import genreInstance from "src/axios/genreInstance";
import { useDispatch } from "react-redux";
import { updateArtistProfile } from "src/store/actions/authActions";
import Loader from "src/components/Loader";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

export default function UpdateProfileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const [artistData, setArtistData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    const response = await artistInstance.get(`/get-profile`);
    const artist = response.data.artist;

    formik.setFieldValue("artistBio", artist.bio);
    formik.setFieldValue("primaryGenre", artist.primaryGenre);
    formik.setFieldValue("secondaryGenre", artist.secondaryGenre);
    formik.setFieldValue("type", artist.type);
    formik.setFieldValue("groupName", artist.groupName);
    formik.setFieldValue("street", artist.address.street);
    formik.setFieldValue("city", artist.address.city);
    formik.setFieldValue("state", artist.address.state);
    formik.setFieldValue("country", artist.address.country);

    formik.setFieldValue("profilePicture", artist.profilePicture);
    formik.setFieldValue("bannerImage", artist.bannerImage);

    setArtistData(artist);
    setLoading(false);
  };

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");
    setGenres(response.data.genres);
  };

  const LoginSchema = Yup.object().shape({
    artistBio: Yup.string().required("Please tell us about yourself"),
    primaryGenre: Yup.string().required("Primary genre is required"),
    secondaryGenre: Yup.string(),
    profilePicture: Yup.mixed().required("Profile picture is required"),
    bannerImage: Yup.mixed().required("Banner image is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Region is required"),
    country: Yup.string().required("Country is required"),
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
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const formData = new FormData();
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
        };

        formData.append("address", JSON.stringify(address));

        await dispatch(updateArtistProfile(formData));

        const toastId = toast.loading("Saving changes...");

        toast.update(toastId, {
          render: "Changes saved successfully",
          type: "success",
          isLoading: false,
          autoClose: 500,
        });
      } catch (err) {
        setErrors({ error: err.response.data.message });
      }
    },
  });

  const {
    errors,
    touched,
    values,
    dirty,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const isProfileDataChanged = () => {
    if (
      values.artistBio !== artistData.bio ||
      values.primaryGenre !== artistData.primaryGenre ||
      values.secondaryGenre !== artistData.secondaryGenre ||
      values.type !== artistData.type ||
      values.groupName !== artistData.groupName ||
      values.street !== artistData.address.street ||
      values.city !== artistData.address.city ||
      values.state !== artistData.address.state ||
      values.country !== artistData.address.country
    ) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
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
                  error={Boolean(
                    touched.secondaryGenre && errors.secondaryGenre
                  )}
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
                <Stack
                  spacing={1}
                  width="50%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LazyLoadImage
                    src={
                      values?.profilePicture?.name
                        ? URL.createObjectURL(values?.profilePicture)
                        : artistData?.profilePicture
                    }
                    alt="profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "1rem",
                    }}
                    effect="blur"
                  />
                  <Button variant="outlined" component="label">
                    Change Profile Picture
                    <input
                      type="file"
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
                <Stack
                  spacing={1}
                  width="50%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LazyLoadImage
                    src={
                      values?.bannerImage?.name
                        ? URL.createObjectURL(values?.bannerImage)
                        : artistData?.bannerImage
                    }
                    alt="profile"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "1rem",
                    }}
                    effect="blur"
                  />
                  <Button variant="outlined" component="label">
                    Change Banner Image
                    <input
                      type="file"
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
              <FormHelperText
                style={{ color: "#ff3333", marginBottom: "3rem" }}
              >
                {formik.errors.error}
              </FormHelperText>
            )}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              // disable the button if nothing has changed
              //   disabled={isProfileDataChanged()}
            >
              Continue
            </LoadingButton>
          </Form>
        </FormikProvider>
      )}
    </Box>
  );
}

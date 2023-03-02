import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import genreInstance from "src/axios/genreInstance";
import trackInstance from "src/axios/trackInstance";

import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function EditTrackForm({ handleClose, track }) {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");
    setGenres(response.data.genres);

    formik.setFieldValue("title", track.title);
    formik.setFieldValue("description", track.description);
    formik.setFieldValue("genre", track.genre._id);
    formik.setFieldValue("price", track.price);
    formik.setFieldValue("coverImage", track.coverImage);
  };

  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    genre: Yup.string().required("Genre is required"),
    price: Yup.number()
      .positive()
      .required("Price is required")
      .test(
        "maxDigitsAfterDecimal",
        "Price must have 2 digits after decimal or less",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
      )
      .min(0.5),
    coverImage: Yup.mixed().required("Cover Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: "",
      price: 0,
      coverImage: null,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log(values);

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("genre", values.genre);
        formData.append("price", values.price);
        formData.append("coverImage", values.coverImage);

        const response = await trackInstance.post(
          `/${track._id}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        const toastId = toast.loading("Uploading track ...");
        toast.update(toastId, {
          render: "Track uploaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        handleClose("success");
      } catch (err) {
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

  console.log("errors", errors);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} my={3}>
          <TextField
            fullWidth
            placeholder="Track title"
            label="Track title"
            {...getFieldProps("title")}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Description"
            {...getFieldProps("description")}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select={true}
              label=" Genre"
              {...getFieldProps("genre")}
              error={Boolean(touched.genre && errors.genre)}
              helperText={touched.genre && errors.genre}
              value={values.genre}
            >
              {genres
                .filter((genre) => genre._id !== values.secondaryGenre)
                .map((genre) => (
                  <MenuItem value={genre._id}>{genre.name}</MenuItem>
                ))}
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Price"
              {...getFieldProps("price")}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction="column">
            <img
              src={
                values?.coverImage?.name
                  ? URL.createObjectURL(values?.coverImage)
                  : track?.coverImage
              }
              alt="profile"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            />

            <Button variant="outlined" component="label" fullWidth>
              Update Cover Image
              <input
                type="file"
                accept="image/*"
                value=""
                hidden
                onChange={(e) => {
                  setFieldValue("coverImage", e.currentTarget.files[0]);
                }}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {values?.coverImage?.name}
            </Typography>

            <Typography
              variant="caption"
              color="textSecondary"
              pl={2}
              sx={{
                color: "red",
              }}
            >
              {errors?.coverImage}
            </Typography>
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
        >
          Update Track
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

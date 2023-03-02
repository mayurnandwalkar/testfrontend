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
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import genreInstance from "src/axios/genreInstance";
import albumInstance from "src/axios/albumInstance";

import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function CreateNewAlbumForm({
  handleClose,
  refetchOverviewSection,
}) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");
    setGenres(response.data.genres);
  };

  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    genre: Yup.string().required("Genre is required"),
    coverImage: Yup.mixed().required("Cover Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      genre: "",
      coverImage: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log(values);

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("genre", values.genre);
        formData.append("coverImage", values.coverImage);

        const response = await albumInstance.post("/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const toastId = toast.loading("Creating album...");
        toast.update(toastId, {
          render: "Album created  successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        handleClose();
        refetchOverviewSection();

        console.log(response.data);
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} my={3}>
          <TextField
            fullWidth
            placeholder="Album title"
            label="Album title"
            {...getFieldProps("title")}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              select={true}
              label=" Genre"
              {...getFieldProps("genre")}
              error={Boolean(touched.genre && errors.genre)}
              helperText={touched.genre && errors.genre}
            >
              {genres
                .filter((genre) => genre._id !== values.secondaryGenre)
                .map((genre) => (
                  <MenuItem value={genre._id}>{genre.name}</MenuItem>
                ))}
            </TextField>
          </Stack>

          <Stack direction="column">
            <Button variant="outlined" component="label" fullWidth>
              Upload Cover Image
              <input
                type="file"
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
          Create Album
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

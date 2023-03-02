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
import { useDispatch } from "react-redux";
import moment from "moment";
import { artistOnboarding } from "src/store/actions/authActions";
import DropzoneUploader from "./dropzoneUplaoder";
import trackInstance from "src/axios/trackInstance";
import { toast } from "react-toastify";

import useSWR, { mutate } from "swr";
import Loader from "../Loader";

// ----------------------------------------------------------------------

export default function AddToAlbumForm({
  handleClose,
  refetchOverviewSection,
}) {
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await genreInstance.get("/");
    setGenres(response.data.genres);
  };

  const fetchAlbums = async () => {
    const response = await albumInstance.get("/user");
    console.log("response", response.data.albums);
    setAlbums(response.data.albums);
  };

  // const fetchAlbums = async () => {
  //   const response = await albumInstance.get("/user");
  //   console.log("response", response.data.albums);
  //   return response.data.albums;
  // };

  // const fetchGenres = async () => {
  //   const response = await genreInstance.get("/");
  //   console.log("response", response.data.genres);
  //   return response.data.genres;
  // };

  // const { data: albums, error: albumsError } = useSWR(
  //   "/albums for add track to album ",
  //   fetchAlbums
  // );

  // const { data: genres, error: genresError } = useSWR(
  //   "/genres for add track to album",
  //   fetchGenres
  // );

  const LoginSchema = Yup.object().shape({
    album: Yup.string().required("Album is required"),
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
    file: Yup.mixed().required("Please upload a file"),
    coverImage: Yup.mixed().required("Cover Image is required"),
    duration: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      genre: "",
      price: "",
      file: "",
      coverImage: "",
      duration: 0,
      album: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("genre", values.genre);
        formData.append("price", values.price);
        formData.append("file", values.file);
        formData.append("coverImage", values.coverImage);
        formData.append("duration", values.duration);
        formData.append("albumId", values.album);

        const response = await trackInstance.post("/album", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const toastId = toast.loading("Uploading track...");
        toast.update(toastId, {
          render: "Track added to album successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        handleClose();
        refetchOverviewSection();

        setStatus({ success: true });
        setSubmitting(false);
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

  const handleFileChange = ({ meta, file }, status) => {
    if (status === "done") {
      setFieldValue("file", file);
      setFieldValue("duration", meta.duration);
    }

    if (status === "removed") {
      setFieldValue("file", "");
      setFieldValue("duration", 0);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} my={3}>
          <TextField
            fullWidth
            select={true}
            label="Album"
            {...getFieldProps("album")}
            error={Boolean(touched.album && errors.album)}
            helperText={touched.album && errors.album}
          >
            {albums?.length > 0 &&
              albums?.map((album) => (
                <MenuItem value={album._id}>{album.title}</MenuItem>
              ))}
          </TextField>
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
            >
              {genres
                ?.filter((genre) => genre._id !== values.secondaryGenre)
                ?.map((genre) => (
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
          <Stack direction="column">
            <DropzoneUploader handleFileChange={handleFileChange} />

            <Typography
              variant="caption"
              color="textSecondary"
              pl={2}
              sx={{
                color: "red",
              }}
            >
              {errors?.file}
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
          Add to Album
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

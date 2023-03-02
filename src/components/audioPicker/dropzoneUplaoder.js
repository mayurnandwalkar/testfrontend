import Dropzone from "react-dropzone-uploader";

import "react-dropzone-uploader/dist/styles.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DropzoneUploader = ({ handleFileChange }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(
      "Files: ",
      files.map((f) => f.meta)
    );
    // allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      onChangeStatus={handleFileChange}
      //   onSubmit={handleSubmit}
      accept="audio/mpeg, audio/x-m4a"
      maxFiles={1}
      inputContent="Drop an mp3 or m4a file here"
      styles={{
        dropzone: { width: isMobile ? 300 : 400, height: isMobile ? 100 : 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
  );
};

export default DropzoneUploader;

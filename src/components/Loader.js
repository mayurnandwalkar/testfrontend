import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} />
    </div>
  );
};

export default Loader;

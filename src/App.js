// routes
import Router from "./routes/routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Router />
      <ToastContainer
        position="bottom-center"
        autoClose={50}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </ThemeProvider>
  );
}

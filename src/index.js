// scroll bar
import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// main application
import App from "./App";

// ----------------------------------------------------------------------

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

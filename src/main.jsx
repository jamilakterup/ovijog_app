import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import DashboardLayout from "./view/layouts/DashboardLayout.jsx";
import routes from "./view/routes/routes.jsx";
import { Provider } from "react-redux";
import { store } from "./view/redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes}>
      <DashboardLayout />
    </RouterProvider>
    </Provider>
  </StrictMode>
);

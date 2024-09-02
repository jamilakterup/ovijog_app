import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./view/routes/routes.jsx";
import DashboardLayout from "./view/layouts/DashboardLayout.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <ToastContainer />
      <DashboardLayout />
    </RouterProvider>
  </StrictMode>
);

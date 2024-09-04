import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import DashboardLayout from "./view/layouts/DashboardLayout.jsx";
import routes from "./view/routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <DashboardLayout />
    </RouterProvider>
  </StrictMode>
);

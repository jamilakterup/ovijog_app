import { createBrowserRouter } from "react-router-dom";
import ComplainerLayout from "../layouts/ComplainerLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/dashboard/HomePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ComplainerLayout />,
        errorElement: '404'
    },
    {
        path: '/dashboard/home',
        element: <DashboardLayout />,
        errorElement: '404',
        children: [
            {
                path: '/dashboard/home',
                element: <HomePage />
            }
        ]
    }
]);

export default router;
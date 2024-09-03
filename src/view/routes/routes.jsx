import { createBrowserRouter } from "react-router-dom";
import ComplainerLayout from "../layouts/ComplainerLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/dashboard/HomePage";
import ComplainTable from "../pages/dashboard/complain/ComplainTable";
import TrackingPage from "../pages/complain_page/TrackingPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ComplainerLayout />,
        errorElement: '404'
    },
    {
        path: '/tracking/:trackingId',
        element: <TrackingPage />,
        errorElement: '404'
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: '404',
        children: [
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path:'complain-table',
                element: <ComplainTable />
            }
        ]
    }
]);

export default router;
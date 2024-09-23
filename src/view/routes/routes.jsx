import { createBrowserRouter } from "react-router-dom";
import ComplainerLayout from "../layouts/ComplainerLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/dashboard/HomePage";
import ComplainTable from "../pages/dashboard/complain/ComplainTable";
import TrackingPage from "../pages/complain_page/TrackingPage";
import Login from "../pages/login-registration/Login";
import Registration from "../pages/login-registration/Registration";
import TestLayout from "../layouts/TestLayout";
import ViewComplain from "../pages/dashboard/complain/ViewComplain";
import ProtectedRoute from "./ProtectedRoute";
import UsersCard from "../pages/dashboard/users/UsersCard";


const routes = createBrowserRouter([
    {
        path: '/test',
        element: <TestLayout />,
        errorElement: '404'
    },
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
        path: '/complain-details/:trackingId',
        element: <ViewComplain/>,
        errorElement: '404'
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: '404'
    },
    {
        path: '/registration',
        element: <Registration />,
        errorElement: '404'
    },
    {
        path: '/dashboard',
        element:<ProtectedRoute element={<DashboardLayout />}/> ,
        errorElement: '404',
        children: [
            {
                path: 'home',
                element: <ProtectedRoute element={<HomePage />}/>
            },
            {
                path: 'complain-table',
                element: <ProtectedRoute element={<ComplainTable />} />
            },
            {
                path: 'users',
                element: <ProtectedRoute element={<UsersCard />} />
            }
        ]
    },
    {
        path: '*',
        element: '404',
    },
]);

export default routes;
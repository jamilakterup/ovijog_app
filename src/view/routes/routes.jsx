import { createBrowserRouter } from "react-router-dom";
import ComplainerLayout from "../layouts/ComplainerLayout";
import DashboardLayout from "../layouts/DashboardLayout";

const router= createBrowserRouter([
    {
        path:'/',
        element:<ComplainerLayout/>,
        errorElement:'404'
    },
    {
        path:'/dashboard/home',
        element:<DashboardLayout/>,
        errorElement:'404',
        children:[
            {
                path:'/dashboard/home',
                element:"home compont"
            }
        ]
    }
]);

export default router;
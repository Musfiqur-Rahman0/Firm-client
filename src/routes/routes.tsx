import { createBrowserRouter } from "react-router-dom";
import { layout } from "../layout/layout";
import { AuthLayout } from "../layout/AuthLayout";

import Register from "../pages/Register";
import { Error } from "../pages/Error";
import Login from "../pages/Login";

const router = createBrowserRouter([

    {
        path : "/",
        Component :  layout,
        children : [
            {
                path : "/home",
                Component : () => <h1>Home</h1>
            }
        ],
    }, 
    {
        path : "/auth", 
        Component : AuthLayout,
        children : [
            {
                path : "login",
                Component : Login
            },
            {
                path : "register",
                Component : Register
            }
        ]
    }, 
    {
    path: "*",
    element: <Error />,
  },
]);

export default router;
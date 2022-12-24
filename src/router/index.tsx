import Layout from "layout";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("pages/home"));

const Router = () => {
    // const {authen} = useAppSelector(state => state.authen);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [{ path: "", element: <HomePage /> }],
        },
    ]);

    return <RouterProvider router={router} />;
};
export default Router;

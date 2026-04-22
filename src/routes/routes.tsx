import { createBrowserRouter } from "react-router-dom";
import { layout } from "../layout/Layout";
import { AuthLayout } from "../layout/AuthLayout";

import Register from "../pages/Register";
import { Error } from "../pages/Error";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import FarmRental from "../pages/FarmRental";
import Marketplace from "../pages/Marketplace";
import PlantTracking from "../pages/PlantTracking";
import CommunityForum from "../pages/ComunityForum";
import Orders from "../pages/Orders";
import LandingPage from "../pages/LandingPage";
import { RentalPlaces } from "../pages/RentalPlaces";
import CreateVendorProfile from "../pages/CreateVendorProfile";
import ProducePage from "../pages/ProducePage/Produce";

const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "/home",
        Component: () => <h1>Home</h1>,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/firm-rentals",
        element: <FarmRental />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />,
      },

      {
        path: "/plant-tracking",
        element: <PlantTracking />,
      },
      {
        path: "/forum",
        element: <CommunityForum />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/rental-places",
        element: <RentalPlaces />,
      },
      {
        path: "/become-vendor",
        element: <CreateVendorProfile />,
      },
      {
        path: "/produce",
        element: <ProducePage />,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/test",
    element: <h2>Test Page</h2>,
  },
]);

export default router;

import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Profile from "./pages/Profile";
// import Marketplace from "./pages/Marketplace";
// import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostPassword from "./pages/LostPassword";
import MyListings from "./pages/MyListings";
import ErrorPage from "./pages/Error/";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReadProperties from "./components/Properties/properties.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      // {
      //   path: "marketplace",
      //   element: <Marketplace />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "lost-password",
        element: <LostPassword />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // { path: "properties",
      //   element: <ReadProperties />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="bottom-center" theme="dark" />
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Features from "./pages/Features";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LostPassword from "./pages/LostPassword";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error/";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReadProperties from "./components/Properties/properties.jsx";

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
        path: "product",
        element: <Product />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
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
        path: "dashboard",
        element: <Dashboard />,
      },
      { path: "Properties",
        element: <ReadProperties />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer position="bottom-center" theme="dark" />
    <RouterProvider router={router} />
  </React.StrictMode>
);

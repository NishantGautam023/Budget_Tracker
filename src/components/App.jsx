// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard, { dashboardLoader } from "../pages/Dashboard";
import Erros from "../pages/Errors";
import MainLayout, { mainLoader } from "./MainLayout";
import { logoutAction } from "../utils/logoutAction";

// Library Imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader, // the function that loading the data
    errorElement: <Erros />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader, // the function that loading the data
        errorElement: <Erros />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

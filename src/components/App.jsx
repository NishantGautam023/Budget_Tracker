// react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard, {
  dashboardAction,
  dashboardLoader,
} from "../pages/Dashboard";
import Erros from "../pages/Errors";
import MainLayout, { mainLoader } from "./MainLayout";
import { logoutAction } from "../utils/logoutAction";

// Combination of Named and Default Export.
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "../pages/ExpensesPage";

// Library Imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BudgetPage, { budgetAction, budgetLoader } from "../pages/BudgetPage";

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
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Erros />,
      },
      {
        path: "expenses", // act as a route #expense
        element: <ExpensesPage />, // page to show when the route gets hit
        loader: expensesLoader, // loader to show
        action: expensesAction,
        errorElement: <Erros />,
      },
      {
        path: "budget/:id", // act as a route /budget, : acting dynamic
        element: <BudgetPage />, // page to show when the route gets hit
        loader: budgetLoader, // loader to show
        action: budgetAction,
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

import { useLoaderData } from "react-router-dom";
import {
  createBudget,
  createExpense,
  fetchData,
  generateDelay,
} from "../utils/helpers";
import HomePage from "../components/HomePage";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

// Loader function
export function dashboardLoader() {
  // Look in the LocalStorage for a key called userName
  const userName = fetchData("userName"); // This userName is the key pased in the helper function of Dashboard.jsx
  const budgets = fetchData("budgets");
  return { userName, budgets }; // return the data we getting, return the object as userName as one of the Object.
}

// Handling Actions when user Submit the Form in the HomePage.
export async function dashboardAction({ request }) {
  // randomly wait for certain amount of time
  await generateDelay();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new User submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (erorr) {
      throw new Error("Problem in Creating in your Account");
    }
  }

  if (_action === "createBudget") {
    // Save a new Budget to my localStorage, in the helper function of helper.js and extract it here
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Created");
    } catch (error) {
      throw new Error("There was a problem creating your budget. ");
    }
  }

  if (_action === "createExpense") {
    // Create an expense
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
        //    Each of the select options had an actual options, which had a value which was
        //  the id of the budget
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (error) {
      throw new Error("There was a problem creating your Expense. ");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default Dashboard;

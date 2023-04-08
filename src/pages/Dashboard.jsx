import { useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/helpers";
import HomePage from "../components/HomePage";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";

// Loader function
export function dashboardLoader() {
  // Look in the LocalStorage for a key called userName
  const userName = fetchData("userName"); // This userName is the key pased in the helper function of Dashboard.jsx
  const budgets = fetchData("budgets");
  return { userName, budgets }; // return the data we getting, return the object as userName as one of the Object.
}

// Handling Actions when user Submit the Form in the HomePage.
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  console.log(formData);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome ${formData.userName}`);
  } catch (erorr) {
    throw new Error("Problem in Creating in your Account");
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
            {/* If there are budget display something, and if not budget display something else
              budgets ? () : ()
            */}
            <div className="gird-lg">
              <div className="flex-lg">
                <AddBudgetForm></AddBudgetForm>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </>
  );
};

export default Dashboard;

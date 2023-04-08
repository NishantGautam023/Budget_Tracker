import { useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/helpers";
import HomePage from "../components/HomePage";
import { toast } from "react-toastify";

// Loader function
export function dashboardLoader() {
  const userName = fetchData("userName"); // This userName is the key pased in the helper function of Dashboard.jsx
  return { userName }; // return the data we getting, return the object as userName as one of the Object.
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
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <HomePage />}</>;
};

export default Dashboard;

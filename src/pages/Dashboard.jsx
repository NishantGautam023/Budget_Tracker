import { useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/helpers";

// Loader function
export function dashboardLoader() {
  const userName = fetchData("userName"); // This userName is the key pased in the helper function of Dashboard.jsx
  return { userName }; // return the data we getting, return the object as userName as one of the Object.
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <>
      <h1>{userName}</h1>
      <p>Dashboard</p>
    </>
  );
};

export default Dashboard;

// React router imorts
import { Outlet, useLoaderData } from "react-router-dom";

// Helper functoins
import { fetchData } from "../utils/helpers";

// assets
import wave from "../assets/wave.svg";

// components
import NavBar from "./NavBar";

// Loader function
export function mainLoader() {
  const userName = fetchData("userName"); // This userName is the key pased in the helper function of Main.jsx
  return { userName }; // return the data we getting, return the object as userName as one of the Object.
}

const MainLayout = () => {
  const { userName } = useLoaderData();

  return (
    <>
      <div className="layout">
        {<NavBar userName={userName} />}
        <h1>{userName}</h1>
        <main>
          <Outlet />
        </main>
        <img src={wave} alt="" />
      </div>
    </>
  );
};

export default MainLayout;

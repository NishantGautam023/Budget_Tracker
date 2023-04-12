// react-router-dom Imports

import { Form, NavLink } from "react-router-dom";

// assets
import logomark from "../assets/logomark.svg";

// library
import { TrashIcon } from "@heroicons/react/24/solid";

export default function NavBar({ userName }) {
  function handleFormSubmit(event) {
    if (!confirm("Do you want to Delete user and all Data")) {
      event.preventDefault();
    }
  }

  return (
    <>
      <nav>
        <NavLink to="/" aria-label="Go to Home">
          <img src={logomark} alt="" height={30} />
          <span>BudgetTracker</span>
        </NavLink>

        {userName && (
          <Form method="post" action="logout" onSubmit={handleFormSubmit}>
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )}
      </nav>
    </>
  );
}

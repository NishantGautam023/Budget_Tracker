// assets
import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";

export default function NavBar({ userName }) {
  return (
    <>
      <nav>
        <NavLink to="/" aria-label="Go to Home">
          <img src={logomark} alt="" height={30} />
          <span>BudgetTracker</span>
        </NavLink>
        {userName && (
          <Form method="post" action="/logout">
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
            </button>
          </Form>
        )}
      </nav>
    </>
  );
}

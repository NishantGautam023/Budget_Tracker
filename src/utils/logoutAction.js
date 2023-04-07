//react-router-dom
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "./helpers";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  // return redirect
  return redirect("/"); // Redirects back to the Home Page.
}

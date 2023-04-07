//react-router-dom
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "./helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  toast.success("You've Deleted your account");
  // return redirect
  return redirect("/"); // Redirects back to the Home Page.
}

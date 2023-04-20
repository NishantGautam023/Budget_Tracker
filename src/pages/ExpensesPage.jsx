import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../utils/helpers";
import Table from "../components/Tables";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// loader
export async function expensesLoader({ request }) {
  const expenses = await fetchData("expenses");
  return { expenses };
}

// action

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // get the data from the form
  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your Expense. ");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  const navigate = useNavigate();

  function handleRedirect() {
    return navigate("/");
  }

  return (
    <>
      <div className="grid-lg">
        <h1>My recent Expenses</h1>

        {expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>
              Recent Expenses <small>({expenses.length}total)</small>
            </h2>
            <Table expenses={expenses} />
          </div>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleRedirect}
          >
            No Expenses Yet! Please Add Expenses by logging in!
          </button>
        )}
      </div>
    </>
  );
};

export default ExpensesPage;

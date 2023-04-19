import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../utils/helpers";
import Table from "../components/Tables";
import { toast } from "react-toastify";

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
  return (
    <>
      <div className="grid-lg">
        <h1>ExpensesPage</h1>

        {expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>
              Recent Expenses <small>({expenses.length}total)</small>
            </h2>
            <Table expenses={expenses} />
          </div>
        ) : (
          <p>No Expenses to show!!!</p>
        )}
      </div>
    </>
  );
};

export default ExpensesPage;

import { useLoaderData } from "react-router-dom";
import { fetchData } from "../utils/helpers";
import Table from "../components/Tables";

export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
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

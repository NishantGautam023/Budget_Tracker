// helper imports
import { Link, useFetcher } from "react-router-dom";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../utils/helpers";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function ExpenseItem({ expense, showBudget }) {
  const fetcher = useFetcher();
  // Helper function to get the Budget
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>

      {showBudget && (
        <td>
          <Link
            style={{ "--accent": budget.color }}
            to={`/budget/${budget.id}`}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        {/* // Submit the form on that page and handle the action on that page.  */}
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            {/* // Delete icon from hero icons */}
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
}

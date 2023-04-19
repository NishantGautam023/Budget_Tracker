// loader

import { useLoaderData } from "react-router-dom";
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../utils/helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Tables";
import { toast } from "react-toastify";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  //   check if there is no budget
  if (!budget) {
    throw new Error("Budget you trying to find doesn't exist!!!");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // get the data from the form
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your Expense. ");
    }
  }

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

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <>
      <div className="grid-lg" style={{ "--accent": budget.color }}>
        <h1 className="h2">
          <span className="accent">{budget.name} </span>
          Overvview
        </h1>
        <div className="flex-lg">
          <BudgetItem budget={budget} />
          <AddExpenseForm budgets={[budget]} />
        </div>
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span>
            </h2>
            Expenses
            <Table expenses={expenses} showBudget={false}></Table>
          </div>
        )}
      </div>
    </>
  );
}

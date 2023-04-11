import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    // if not done submitting,
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();

      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <>
      <div className="form-wrapper">
        <h2 className="h3">
          Add New{" "}
          <span className="accent">
            {budgets.length === 1 &&
              budgets.map((budget) => {
                console.log(budget.name);
                return <div key={budget.id}> {budget.name} </div>;
              })}
          </span>
          Expense
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
          <div className="expense-inputs">
            {/* Set the Name and amount of expense side by side  */}
            <div className="grid-xs">
              <label htmlFor="newExpense">Expense Name</label>
              <input
                type="text"
                name="newExpense"
                id="newExpense"
                placeholder="eg: Coffee"
                ref={focusRef}
                required
              />
            </div>

            <div className="grid-xs">
              <label htmlFor="newExpenseAmount">Amount</label>
              <input
                type="number"
                name="newExpenseAmount"
                id="newExpenseAmount"
                step="0.01"
                inputMode="decimal"
                placeholder="e.g. 3.50"
                required
              />
            </div>
          </div>

          {/* if one budget should not display and if more then one budget should display */}

          <div className="grid-xs">
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {/* Sorting the Budget by when they are created and looping them through down 
                    the list.  */}
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>

          {/* When the form is submitted like AddBudgetForm        */}

          <input
            type="hidden"
            name="_action
        "
            value="createdExpense"
          />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Creating budget ...</span>
            ) : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}

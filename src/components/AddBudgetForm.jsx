// Icon Imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

// React Imports
import { useEffect, useRef } from "react";

// React-router-dom Imports
import { Form, useFetcher } from "react-router-dom";

export default function AddBudgetForm() {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <>
      <div className="form-wrapper">
        <h2 className="h3">Create Budget</h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
          <div className="grid-xs">
            <label htmlFor="newBudget">Budget Name</label>
            <input
              type="text"
              name="newBudget"
              id="newBudget"
              placeholder="e.g, Groceries"
              required
              ref={focusRef}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newBudgetAmount">Amount</label>
            <input
              type="number"
              name="newBudgetAmount"
              id="newBudgetAmount"
              step="0.01"
              placeholder="e.g, $200"
              required
              inputMode="decimal"
            />
          </div>
          <input type="hidden" name="_action" value="createBudget" />
          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Creating budget ...</span>
            ) : (
              <>
                <span>Create Budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
    </>
  );
}

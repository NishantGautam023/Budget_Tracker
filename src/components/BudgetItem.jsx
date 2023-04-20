import { Form, Link } from "react-router-dom";
import {
  calculateBudgetSpent,
  formatCurrency,
  formatPercentage,
} from "../utils/helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color } = budget;
  const spentMoney = calculateBudgetSpent(id);
  return (
    <>
      <div className="budget" style={{ "--accent": color }}>
        <div className="progess-text">
          <h3>{name}</h3>
          <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spentMoney}>
          {/* Percentage */}
          {formatPercentage(spentMoney / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spentMoney)} spent</small>
          <small>{formatCurrency(amount - spentMoney)} remaining</small>
        </div>
        {/* Show View Expense and Delete Button by passing Props  */}
        {showDelete ? (
          <div className="flex-sm">
            <Form
              method="post"
              action="delete"
              onSubmit={(event) => {
                if (
                  !confirm(
                    "Are you sure you want to delete permanently this Budget?"
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Delete Budget</span>
                <TrashIcon width={20}></TrashIcon>
              </button>
            </Form>
          </div>
        ) : (
          <div className="flex-sm">
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <BanknotesIcon width={20}></BanknotesIcon>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

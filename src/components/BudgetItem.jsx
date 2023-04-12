import { formatCurrency } from "../utils/helpers";

export default function BudgetItem({ budget }) {
  const { id, name, amount, color } = budget;
  return (
    <>
      <div className="budget">
        <div className="progess-text">
          <h3>{name}</h3>
          <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value="100">
          {/* Percentage */}
        </progress>
        <div className="progress-text">
          <small>... spent</small>
          <small>... remaining</small>
        </div>
      </div>
    </>
  );
}

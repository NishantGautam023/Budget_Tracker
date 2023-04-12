import {
  calculateBudgetSpent,
  formatCurrency,
  formatPercentage,
} from "../utils/helpers";

export default function BudgetItem({ budget }) {
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
      </div>
    </>
  );
}

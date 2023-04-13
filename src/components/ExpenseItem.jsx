// helper imports
import { formatCurrency, formatDateToLocaleString } from "../utils/helpers";

export default function ExpenseItem({ expense }) {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
    </>
  );
}

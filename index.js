import "./index.css";
import { months } from "../constants";

const getMonthName = (monthNbr) => {
  return months.find((m) => m.value === monthNbr).label;
};

export default function TransactionTable({ transactions }) {
  return (
    <table>
      <tr>
        <th>Month</th>
        <th>Amount</th>
        <th>Points</th>
      </tr>
      {transactions.map((t) => (
        <tr>
          <td>{getMonthName(t.month)}</td>
          <td>{t.amount}</td>
          <td>{t.points}</td>
        </tr>
      ))}
    </table>
  );
}
import { useEffect, useState } from "react";
import "./App.css";
import { months } from "./constants";
import TransactionTable from "./TransactionTable";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    month: 0,
  });
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5200/api/transactions")
      .then((res) => res.json())
      .then((res) => setTransactions(res));
  }, []);
  const onAdd = () => {
    if (form.amount > 0 && form.month >= 0) {
      fetch("http://localhost:5200/api/add-transaction", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setTransactions(res));
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: +value });
  };

  return (
    <>
      <div className="App">
        <div className="form-control">
          <label>Month: </label>
          <select name="month" value={form.month} onChange={onInputChange}>
            {months.map((m) => (
              <option value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label>Amount: </label>
          <input
            name="amount"
            value={form.amount}
            type="number"
            onChange={onInputChange}
          />
        </div>
        <div>
          <button onClick={onAdd}>Add</button>
        </div>
      </div>
      <div className="transactions-table">
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
}

export default App;
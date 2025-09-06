import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Transactions() {
  // Initialize the transaction list when the component mounts by
  // invoking the global renderTransactionsList function from script.js
  useEffect(() => {
    if (typeof window !== 'undefined' && window.renderTransactionsList) {
      window.renderTransactionsList();
    }
  }, []);

  // Handle form submission by delegating to the global addTransaction
  // and re-render functions defined in script.js. Using an inline
  // handler allows us to access form elements via the event target.
  const handleSubmit = (event) => {
    event.preventDefault();
    const { date, description, amount, type } = event.target;
    const parsedAmount = parseFloat(amount.value);
    if (!date.value || description.value.trim() === '' || isNaN(parsedAmount)) {
      alert('Please fill in all fields correctly.');
      return;
    }
    if (window.addTransaction) {
      window.addTransaction({
        date: date.value,
        description: description.value.trim(),
        amount: parsedAmount,
        type: type.value,
      });
    }
    // Reset the form
    event.target.reset();
    // Re-render transaction list
    if (window.renderTransactionsList) {
      window.renderTransactionsList();
    }
  };

  return (
    <>
      <Head>
        <title>Money CEO – Transactions</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Load shared functions */}
        <script src="/script.js"></script>
      </Head>
      <nav className="navbar">
        <div className="nav-left">Money CEO</div>
        <div className="nav-right">
          <Link href="/" legacyBehavior>
            <a className="nav-link">Dashboard</a>
          </Link>
          <Link href="/transactions" legacyBehavior>
            <a className="nav-link active">Transactions</a>
          </Link>
          <Link href="/budgets" legacyBehavior>
            <a className="nav-link">Budgets</a>
          </Link>
          <Link href="/goals" legacyBehavior>
            <a className="nav-link">Goals</a>
          </Link>
          <Link href="/debts" legacyBehavior>
            <a className="nav-link">Debts</a>
          </Link>
          <Link href="/reports" legacyBehavior>
            <a className="nav-link">Reports</a>
          </Link>
        </div>
      </nav>
      <main className="container">
        <h1 className="page-title">Transactions</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" required />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="e.g. Salary"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="amount">Amount (KES)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" required>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">
            Add Transaction
          </button>
        </form>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount (KES)</th>
            </tr>
          </thead>
          <tbody id="transactionsList"></tbody>
        </table>
      </main>
    </>
  );
}
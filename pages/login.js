import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const u = username.value.trim();
    const p = password.value;
    // Simple demonstration credentials. In a real app you would
    // authenticate against a backend. Here we just check hardcoded
    // values and clear the form.
    if (u === 'admin' && p === 'admin123') {
      // Save a flag in sessionStorage to mark logged in
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('moneyceo_logged_in', 'true');
        window.location.href = '/';
      }
    } else {
      setError('Invalid credentials. Try admin/admin123');
    }
  };

  return (
    <>
      <Head>
        <title>Money CEO – Login</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <nav className="navbar">
        <div className="nav-left">Money CEO</div>
        <div className="nav-right">
          <Link href="/" legacyBehavior>
            <a className="nav-link">Dashboard</a>
          </Link>
          <Link href="/transactions" legacyBehavior>
            <a className="nav-link">Transactions</a>
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
        <h1 className="page-title">Login</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-row">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          {error && <p className="note" style={{ color: 'var(--accent)' }}>{error}</p>}
          <button type="submit" className="btn-submit">
            Log In
          </button>
        </form>
      </main>
    </>
  );
}
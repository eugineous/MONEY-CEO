import Head from 'next/head';
import Link from 'next/link';

export default function Goals() {
  return (
    <>
      <Head>
        <title>Money CEO – Goals</title>
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
            <a className="nav-link active">Goals</a>
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
        <h1 className="page-title">Savings Goals</h1>
        <p className="note">
          Goals functionality will be implemented soon to help you track your
          savings targets.
        </p>
      </main>
    </>
  );
}
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // When the page loads, call global functions defined in script.js to
      // render KPI values and draw the income/expense chart. Because
      // script.js attaches these functions to the window object, we can
      // safely reference them here once the script has loaded.
      if (window.renderKPIs) {
        window.renderKPIs();
      }
      if (window.drawIncomeExpenseChart) {
        window.drawIncomeExpenseChart();
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Money CEO – Dashboard</title>
        {/* Import our global stylesheet and Google font */}
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Load Chart.js for the dashboard chart */}
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        {/* Load our shared script functions */}
        <script src="/script.js"></script>
      </Head>
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="nav-left">Money CEO</div>
        <div className="nav-right">
          <Link href="/" legacyBehavior>
            <a className="nav-link active">Dashboard</a>
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
      {/* Main container */}
      <main className="container">
        {/* KPI cards */}
        <section className="kpi-grid">
          <div className="kpi-card">
            <span className="kpi-label">Total Income</span>
            <span id="totalIncome" className="kpi-value income">
              KSh 0
            </span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Total Expenses</span>
            <span id="totalExpenses" className="kpi-value expense">
              KSh 0
            </span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Savings</span>
            <span id="savings" className="kpi-value savings">
              KSh 0
            </span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label">Savings Rate</span>
            <span id="savingsRate" className="kpi-value">0%</span>
          </div>
        </section>
        {/* Chart panel */}
        <section className="chart-panel">
          <h2 className="chart-title">Income vs Expenses</h2>
          <canvas id="incomeExpenseChart" width="400" height="200"></canvas>
        </section>
        {/* Disclaimer */}
        <p className="note">
          Disclaimer: Money CEO is an educational tool. It does not provide
          financial, legal, tax or investment advice. Use at your own risk.
        </p>
      </main>
    </>
  );
}
/*
 * Shared script for Money CEO static site
 * Handles transactions storage, KPI calculations, and chart rendering.
 */

// Retrieve all transactions from localStorage
function getTransactions() {
  try {
    const raw = localStorage.getItem('moneyceo_transactions');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse transactions from localStorage', err);
    return [];
  }
}

// Save transactions back to localStorage
function saveTransactions(transactions) {
  localStorage.setItem('moneyceo_transactions', JSON.stringify(transactions));
}

// Add a new transaction (object with date, description, amount, type)
function addTransaction(tx) {
  const transactions = getTransactions();
  // Normalize date to ISO string for consistency
  const { date, description, amount, type } = tx;
  transactions.push({
    date: date,
    description: description,
    amount: parseFloat(amount),
    type: type
  });
  saveTransactions(transactions);
}

// Calculate income, expenses, savings and savings rate
function calculateTotals() {
  const transactions = getTransactions();
  let income = 0;
  let expenses = 0;
  transactions.forEach(tx => {
    if (tx.type === 'income') {
      income += tx.amount;
    } else {
      expenses += tx.amount;
    }
  });
  const savings = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
  return {
    income,
    expenses,
    savings,
    savingsRate: savingsRate.toFixed(2)
  };
}

// Render KPI values on the dashboard
function renderKPIs() {
  const { income, expenses, savings, savingsRate } = calculateTotals();
  // Elements exist only on dashboard, guard checks if they are found
  const incomeEl = document.getElementById('totalIncome');
  const expenseEl = document.getElementById('totalExpenses');
  const savingsEl = document.getElementById('savings');
  const rateEl = document.getElementById('savingsRate');
  if (incomeEl) incomeEl.textContent = `KSh ${income.toLocaleString()}`;
  if (expenseEl) expenseEl.textContent = `KSh ${expenses.toLocaleString()}`;
  if (savingsEl) savingsEl.textContent = `KSh ${savings.toLocaleString()}`;
  if (rateEl) rateEl.textContent = `${savingsRate}%`;
}

// Render the list of transactions on the transactions page
function renderTransactionsList() {
  const listEl = document.getElementById('transactionsList');
  if (!listEl) return;
  const transactions = getTransactions();
  // Clear existing rows
  listEl.innerHTML = '';
  // If no transactions, show a hint row
  if (transactions.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.textContent = 'No transactions yet. Use the form above to add one!';
    td.style.textAlign = 'center';
    td.style.color = 'var(--muted)';
    tr.appendChild(td);
    listEl.appendChild(tr);
    return;
  }
  // Otherwise create rows
  transactions.forEach(tx => {
    const tr = document.createElement('tr');
    const dateTd = document.createElement('td');
    dateTd.textContent = tx.date;
    const descTd = document.createElement('td');
    descTd.textContent = tx.description;
    const typeTd = document.createElement('td');
    typeTd.textContent = tx.type;
    typeTd.style.color = tx.type === 'income' ? 'var(--positive)' : 'var(--accent)';
    const amountTd = document.createElement('td');
    amountTd.textContent = tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    amountTd.style.color = tx.type === 'income' ? 'var(--positive)' : 'var(--accent)';
    tr.appendChild(dateTd);
    tr.appendChild(descTd);
    tr.appendChild(typeTd);
    tr.appendChild(amountTd);
    listEl.appendChild(tr);
  });
}

// Draw a simple bar chart of income vs expenses on the dashboard
let incomeExpenseChartInstance;
function drawIncomeExpenseChart() {
  const ctx = document.getElementById('incomeExpenseChart');
  if (!ctx) return;
  const { income, expenses } = calculateTotals();
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [{
      label: 'Amount (KES)',
      data: [income, expenses],
      backgroundColor: [
        getComputedStyle(document.documentElement).getPropertyValue('--positive'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent')
      ],
      borderColor: [
        getComputedStyle(document.documentElement).getPropertyValue('--positive'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent')
      ],
      borderWidth: 1
    }]
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') },
        grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border') }
      },
      x: {
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') },
        grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border') }
      }
    },
    plugins: {
      legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text') } }
    }
  };
  // Destroy existing chart if exists
  if (incomeExpenseChartInstance) {
    incomeExpenseChartInstance.destroy();
  }
  incomeExpenseChartInstance = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
}

// Cookie consent banner
function initCookieConsent() {
  // Only run if we're in a browser environment
  if (typeof window === 'undefined') return;
  // Skip if already accepted
  if (localStorage.getItem('moneyceo_cookie_consent')) return;
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <span>This site uses cookies to improve your experience. By using this site, you accept our <a href="privacy.html" target="_blank">Privacy Policy</a>.</span>
    <button id="acceptCookies" class="btn-submit" style="margin-left: 8px; padding: 6px 12px; font-size: 14px;">Accept</button>
  `;
  banner.style.position = 'fixed';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.right = '0';
  banner.style.background = '#1a1b1e';
  banner.style.color = '#f5f5f5';
  banner.style.padding = '12px 16px';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.justifyContent = 'center';
  banner.style.zIndex = '9999';
  document.body.appendChild(banner);
  document.getElementById('acceptCookies').addEventListener('click', () => {
    localStorage.setItem('moneyceo_cookie_consent', 'true');
    banner.remove();
  });
}

// Initialize on every page load
document.addEventListener('DOMContentLoaded', initCookieConsent);

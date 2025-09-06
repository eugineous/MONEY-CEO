/* Shared script functions for Money CEO. These functions operate on
   transactions stored in the browser's localStorage. They are kept in
   the public folder so they can be loaded via a script tag in our
   Next.js pages. */

// Retrieve transactions from localStorage or return an empty array
function getTransactions() {
  try {
    const data = localStorage.getItem('transactions');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading transactions from storage', e);
    return [];
  }
}

// Persist transactions back to localStorage
function saveTransactions(transactions) {
  try {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  } catch (e) {
    console.error('Error saving transactions to storage', e);
  }
}

// Add a new transaction and save
function addTransaction(transaction) {
  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
}

// Compute totals: income, expenses, savings and savings rate
function calculateTotals(transactions) {
  let totalIncome = 0;
  let totalExpenses = 0;
  for (const t of transactions) {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  }
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome !== 0 ? (savings / totalIncome) * 100 : 0;
  return { totalIncome, totalExpenses, savings, savingsRate };
}

// Render KPI values on the dashboard
function renderKPIs() {
  const transactions = getTransactions();
  const { totalIncome, totalExpenses, savings, savingsRate } =
    calculateTotals(transactions);
  const fmt = (value) => value.toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 });
  document.getElementById('totalIncome').textContent = fmt(totalIncome);
  document.getElementById('totalExpenses').textContent = fmt(totalExpenses);
  document.getElementById('savings').textContent = fmt(savings);
  document.getElementById('savingsRate').textContent = `${savingsRate.toFixed(0)}%`;
}

// Render the transactions list on the transactions page
function renderTransactionsList() {
  const transactions = getTransactions();
  const tbody = document.getElementById('transactionsList');
  if (!tbody) return;
  tbody.innerHTML = '';
  transactions.forEach((t) => {
    const tr = document.createElement('tr');
    const date = document.createElement('td');
    date.textContent = t.date;
    const desc = document.createElement('td');
    desc.textContent = t.description;
    const type = document.createElement('td');
    type.textContent = t.type;
    const amount = document.createElement('td');
    amount.textContent = t.amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2 });
    tr.append(date, desc, type, amount);
    tbody.appendChild(tr);
  });
}

// Draw the income vs expense bar chart on the dashboard
function drawIncomeExpenseChart() {
  const transactions = getTransactions();
  const { totalIncome, totalExpenses } = calculateTotals(transactions);
  const ctx = document.getElementById('incomeExpenseChart');
  if (!ctx) return;
  // Destroy previous chart if exists
  if (window.__moneyCeoChart) {
    window.__moneyCeoChart.destroy();
  }
  window.__moneyCeoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          label: 'Amount',
          data: [totalIncome, totalExpenses],
          backgroundColor: ['#10A37F', '#FF4D4F'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Expose functions to window so they can be called from Next pages
window.getTransactions = getTransactions;
window.saveTransactions = saveTransactions;
window.addTransaction = addTransaction;
window.calculateTotals = calculateTotals;
window.renderKPIs = renderKPIs;
window.renderTransactionsList = renderTransactionsList;
window.drawIncomeExpenseChart = drawIncomeExpenseChart;
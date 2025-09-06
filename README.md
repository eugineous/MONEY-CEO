# Money CEO

Money CEO is a simple personal finance tracker and financial literacy tool. This repository contains a static web app built using HTML, CSS and JavaScript. It works out-of-the-box on platforms like GitHub Pages or Vercel and does not require a backend server. All data is stored locally in the browser.

## Features

- Dark themed dashboard with responsive layout.
- Add income and expense transactions.
- Automatically calculate total income, total expenses, savings, and savings rate.
- Interactive bar chart comparing income vs expenses.
- Persistent storage using localStorage.
- Login page (demo credentials: admin/admin123) to hide the app behind a simple gate.
- Cookie consent banner and privacy/terms pages.
- Ready-to-fill budgets, goals, debts and reports pages.

## Getting Started

1. Clone or download this repository.
2. For GitHub Pages: enable GitHub Pages on the `main` branch and point it to the `/docs` folder if you want to host the static preview, or just serve from the root.
3. For Vercel or Netlify: import the repository and choose the root directory; no build step is required.

## Local Development

Open `index.html` in your browser. Transactions and settings are stored in your browser storage. Clearing localStorage will reset your data.

## Recommendations & Roadmap

The following list outlines potential improvements and best practices that could make Money CEO more powerful and user-friendly. Feel free to contribute!

1. Implement user authentication with a secure backend (e.g. Supabase) instead of localStorage.
2. Replace localStorage with a real database.
3. Add registration and password reset flows.
4. Implement categories management for better expense organisation.
5. Add monthly and yearly budget tracking with limits.
6. Add charts for trends over time (line charts for income/expenses).
7. Implement a debt payoff calculator (avalanche and snowball methods).
8. Add savings goals with progress bars.
9. Provide CSV import/export for transactions.
10. Include multi-currency support.
11. Add filters and sorting to the transactions table.
12. Allow editing and deleting existing transactions.
13. Offer a PWA (Progressive Web App) experience for offline usage.
14. Add colour themes and user customisation options.
15. Improve accessibility (ARIA labels, keyboard navigation).
16. Add a dashboard widget for net worth calculation.
17. Display top spending categories with a pie chart.
18. Add date range selectors on the dashboard.
19. Implement multi-language support.
20. Provide printable reports (PDF export).
21. Support recurring transactions (e.g. salary, rent).
22. Add notifications for upcoming bills or budget overages.
23. Integrate with payment gateways for real income tracking.
24. Introduce a dashboard for financial tips and education content.
25. Add integration with bank APIs for automatic transaction import.
26. Provide dark/light theme toggle.
27. Implement a feedback form for users.
28. Add support for tags or labels on transactions.
29. Optimise performance for large datasets.
30. Use Web Workers to keep UI responsive during heavy calculations.
31. Introduce user roles for shared finances (e.g. partners or families).
32. Add multi-account support (e.g. bank, MPESA, crypto).
33. Support attachments or receipts with transactions.
34. Include a dashboard summary by currency.
35. Add diagrams for cash flow visualisation.
36. Provide an onboarding tour for first-time users.
37. Add secure session expiration for the login.
38. Provide integration with budgeting templates or spreadsheets.
39. Use service workers for caching static assets.
40. Write unit tests for core functions.
41. Add continuous deployment via GitHub Actions.
42. Provide a contributions guide in `CONTRIBUTING.md`.
43. Add code splitting and modularisation.
44. Follow semantic versioning for releases.
45. Provide accessibility statement and cookie policy page.

---

Money CEO is provided for educational purposes only and does not constitute financial advice. Use at your own risk.

<?php
$title = 'Money CEO - Dashboard';
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/db.php';

requireAuth();

$pdo = db();
$userId = $_SESSION['user_id'] ?? null;

// Calculate total income and expenses for the logged in user
if ($userId) {
    $stmtIncome = $pdo->prepare("SELECT COALESCE(SUM(amount),0) AS total_income FROM transactions WHERE user_id = ? AND amount > 0");
    $stmtIncome->execute([$userId]);
    $incomeRow = $stmtIncome->fetch();
    $totalIncome = $incomeRow['total_income'] ?? 0;

    $stmtExpense = $pdo->prepare("SELECT COALESCE(SUM(amount),0) AS total_expense FROM transactions WHERE user_id = ? AND amount < 0");
    $stmtExpense->execute([$userId]);
    $expenseRow = $stmtExpense->fetch();
    $totalExpenses = abs($expenseRow['total_expense'] ?? 0);
} else {
    $totalIncome = 0;
    $totalExpenses = 0;
}
?>
<?php include __DIR__ . '/../components/header.php'; ?>
<?php include __DIR__ . '/../components/navbar.php'; ?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
    <?php include __DIR__ . '/../components/sidebar.php'; ?>
    <main class="grid" style="gap:24px">
        <section class="grid grid-2">
            <div class="card kpi"><span class="text-muted">Total Income</span><span class="big">KES <?php echo number_format($totalIncome, 2); ?></span></div>
            <div class="card kpi"><span class="text-muted">Total Expenses</span><span class="big">KES <?php echo number_format($totalExpenses, 2); ?></span></div>
        </section>
        <section class="card">
            <h3>Welcome</h3>
            <p>You are logged in. This dashboard shows your overall totals from your transactions. More features coming soon.</p>
        </section>
    </main>
</div>
<?php include __DIR__ . '/../components/footer.php'; ?>

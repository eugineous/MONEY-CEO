<?php
$title = 'Transactions - Money CEO';
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/db.php';
requireAuth();

$userId = $_SESSION['user_id'] ?? null;
$pdo = db();
// Fetch transactions for user, join categories and accounts
$stmt = $pdo->prepare("SELECT t.id, t.date, t.description, t.amount, c.name AS category, a.name AS account, c.type AS category_type
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN accounts a ON t.account_id = a.id
    WHERE t.user_id = ?
    ORDER BY t.date DESC, t.id DESC");
$stmt->execute([$userId]);
$transactions = $stmt->fetchAll();
?>
<?php include __DIR__.'/../components/header.php'; ?>
<?php include __DIR__.'/../components/navbar.php'; ?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
  <?php include __DIR__.'/../components/sidebar.php'; ?>
  <main class="card">
    <h2>Transactions</h2>
    <?php if ($transactions): ?>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th>Date</th><th>Description</th><th>Amount</th><th>Category</th><th>Account</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($transactions as $txn): ?>
        <tr>
          <td><?php echo e($txn['date']); ?></td>
          <td><?php echo e($txn['description']); ?></td>
          <td><?php echo e(number_format($txn['amount'], 2)); ?></td>
          <td><?php echo e($txn['category'] ?? ''); ?></td>
          <td><?php echo e($txn['account'] ?? ''); ?></td>
        </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <?php else: ?>
    <p>No transactions yet.</p>
    <?php endif; ?>
  </main>
</div>
<?php include __DIR__.'/../components/footer.php'; ?>

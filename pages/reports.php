<?php
$title = 'Reports - Money CEO';
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/auth.php';
requireAuth();
include __DIR__ . '/../components/header.php';
include __DIR__ . '/../components/navbar.php';
?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
  <?php include __DIR__ . '/../components/sidebar.php'; ?>
  <main class="card">
    <h2>Reports</h2>
    <p>Reports functionality coming soon.</p>
  </main>
</div>
<?php include __DIR__ . '/../components/footer.php'; ?>

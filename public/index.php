<?php $title='Money CEO - Dashboard'; include __DIR__.'/../components/header.php'; ?>
<?php include __DIR__.'/../components/navbar.php'; ?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
  <?php include __DIR__.'/../components/sidebar.php'; ?>
  <main class="grid" style="gap:24px">
    <section class="grid grid-2">
      <div class="card kpi"><span class="text-muted">Total Income</span><span class="big">KES 0</span></div>
      <div class="card kpi"><span class="text-muted">Total Expenses</span><span class="big">KES 0</span></div>
    </section>
    <section class="card">
      <h3>Welcome</h3>
      <p>You are set. The site loads, theme toggles, layout is responsive. Next we add pages and database.</p>
    </section>
  </main>
</div>
<?php include __DIR__.'/../components/footer.php'; ?>

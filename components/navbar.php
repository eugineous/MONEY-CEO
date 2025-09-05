<?php
  require_once __DIR__ . '/../includes/helpers.php';
  require_once __DIR__ . '/../includes/auth.php';
?>
<nav class="navbar">
  <div class="nav-inner container">
    <a href="<?php echo url('public/index.php'); ?>" style="color:inherit;text-decoration:none;"><strong>Money CEO</strong></a>
    <div style="display:flex;gap:12px;align-items:center;">
      <button class="btn btn-primary" onclick="toggleTheme()">Toggle theme</button>
      <?php if (!isLoggedIn()): ?>
        <a class="btn btn-outline" href="<?php echo url('pages/login.php'); ?>">Login</a>
        <a class="btn btn-outline" href="<?php echo url('pages/register.php'); ?>">Register</a>
      <?php else: ?>
        <a class="btn btn-outline" href="<?php echo url('pages/settings.php'); ?>">Settings</a>
        <a class="btn btn-outline" href="<?php echo url('pages/logout.php'); ?>">Logout</a>
      <?php endif; ?>
    </div>
  </div>
</nav>

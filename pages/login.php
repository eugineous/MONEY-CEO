<?php
require_once __DIR__.'/../includes/config.php';
require_once __DIR__.'/../includes/helpers.php';
require_once __DIR__.'/../includes/auth.php';
require_once __DIR__.'/../includes/csrf.php';
require_once __DIR__.'/../includes/db.php';

$title='Login - Money CEO';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if ($email && $password) {
        $pdo = db();
        $stmt = $pdo->prepare("SELECT id, password_hash FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password_hash'])) {
            if (session_status() !== PHP_SESSION_ACTIVE) session_start();
            $_SESSION['user_id'] = $user['id'];
            header('Location: ' . url('public/index.php'));
            exit;
        } else {
            $error = 'Invalid credentials';
        }
    } else {
        $error = 'Email and password are required';
    }
}
?>
<?php include __DIR__.'/../components/header.php'; ?>
<?php include __DIR__.'/../components/navbar.php'; ?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
  <?php include __DIR__.'/../components/sidebar.php'; ?>
  <main class="card">
    <h2>Login</h2>
    <?php if ($error): ?>
      <p style="color: var(--color-danger);"><?php echo e($error); ?></p>
    <?php endif; ?>
    <form method="post" action="<?php echo url('pages/login.php'); ?>" class="grid" style="gap:12px;max-width:420px">
      <?php echo csrf_input(); ?>
      <label>Email <input type="email" name="email" required style="width:100%"></label>
      <label>Password <input type="password" name="password" required style="width:100%"></label>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p class="text-muted" style="margin-top:12px">No account? <a href="<?php echo url('pages/register.php'); ?>">Register</a></p>
  </main>
</div>
<?php include __DIR__.'/../components/footer.php'; ?>

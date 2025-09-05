<?php
$title = 'Register - Money CEO';
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/csrf.php';

$errors = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if (!$name || !$email || !$password) {
        $errors[] = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email.';
    }
    if (!$errors) {
        $pdo = db();
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $errors[] = 'Email already registered.';
        } else {
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash, created_at, accepted_disclaimer_at) VALUES (?, ?, ?, NOW(), NOW())");
            $stmt->execute([$name, $email, $passwordHash]);
            $userId = $pdo->lastInsertId();
            if (session_status() !== PHP_SESSION_ACTIVE) { session_start(); }
            $_SESSION['user_id'] = $userId;
            header('Location: ' . url('public/index.php'));
            exit;
        }
    }
}
?>
<?php include __DIR__ . '/../components/header.php'; ?>
<?php include __DIR__ . '/../components/navbar.php'; ?>
<div class="container grid" style="grid-template-columns:260px 1fr;gap:24px">
    <?php include __DIR__ . '/../components/sidebar.php'; ?>
    <main class="card">
        <h2>Create an account</h2>
        <?php foreach ($errors as $error): ?>
            <p style="color:red;"><?php echo e($error); ?></p>
        <?php endforeach; ?>
        <form method="post" action="<?php echo e($_SERVER['PHP_SELF']); ?>" class="grid" style="gap:12px;max-width:480px">
            <?php echo csrf_input(); ?>
            <label>Name <input type="text" name="name" required style="width:100%"></label>
            <label>Email <input type="email" name="email" required style="width:100%"></label>
            <label>Password <input type="password" name="password" required style="width:100%"></label>
            <button class="btn btn-primary" type="submit">Create account</button>
        </form>
    </main>
</div>
<?php include __DIR__ . '/../components/footer.php'; ?>

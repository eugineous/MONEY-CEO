<?php
if (session_status() !== PHP_SESSION_ACTIVE) { session_start(); }

/** Is the user logged in? */
function isLoggedIn(): bool {
  return !empty($_SESSION['user_id']);
}

/** Block page if not logged in */
function requireAuth(): void {
  if (!isLoggedIn()) {
    header('Location: ' . url('pages/login.php'));
    exit;
  }
}

<?php
if (session_status() !== PHP_SESSION_ACTIVE) { session_start(); }

function csrf_token(): string {
  if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf_token'];
}

function csrf_input(): string {
  return '<input type="hidden" name="csrf" value="'.csrf_token().'">';
}

function csrf_verify(): bool {
  $ok = isset($_POST['csrf'], $_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $_POST['csrf']);
  if (!$ok) { http_response_code(400); exit('Bad request: invalid CSRF token'); }
  return true;
}

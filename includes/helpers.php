<?php
require_once __DIR__ . '/config.php';

/**
 * url('pages/login.php') -> full link that respects APP_BASE_URL
 */
function url(string $path): string {
  $base = rtrim(APP_BASE_URL ?? '/', '/');
  $clean = '/' . ltrim($path, '/');
  return $base . $clean;
}

/** Quick safe output */
function e(?string $text): string {
  return htmlspecialchars($text ?? '', ENT_QUOTES, 'UTF-8');
}

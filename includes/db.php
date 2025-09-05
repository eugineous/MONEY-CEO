<?php
/**
 * Database connection placeholder.
 * We will fill DB settings on the last day.
 */
function db(): PDO {
  $host = DB_HOST ?? 'localhost';
  $name = DB_NAME ?? 'money_ceo';
  $user = DB_USER ?? 'root';
  $pass = DB_PASS ?? '';
  $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
  $options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ];
  return new PDO($dsn, $user, $pass, $options);
}

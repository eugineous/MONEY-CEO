-- Create database tables for Money CEO

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  accepted_disclaimer_at TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  type ENUM('cash','bank','mobile') DEFAULT 'mobile',
  opening_balance DECIMAL(12,2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'KES',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  type ENUM('income','expense') NOT NULL,
  color VARCHAR(7) DEFAULT '#10A37F',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_id INT NULL,
  category_id INT NULL,
  date DATE NOT NULL,
  description VARCHAR(255),
  amount DECIMAL(12,2) NOT NULL,
  tags VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_date (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  period_type ENUM('monthly','yearly') NOT NULL,
  period_start DATE NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  target_date DATE NOT NULL,
  priority TINYINT DEFAULT 3,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS debts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  principal DECIMAL(12,2) NOT NULL,
  apr DECIMAL(5,2) DEFAULT 0.00,
  min_payment DECIMAL(12,2) DEFAULT 0.00,
  priority TINYINT DEFAULT 3,
  strategy ENUM('avalanche','snowball') DEFAULT 'avalanche',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  method VARCHAR(40) NOT NULL,
  reference VARCHAR(120),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  status VARCHAR(40) DEFAULT 'pending',
  meta_json JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS advice_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  snapshot_json JSON NOT NULL,
  ai_prompt TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name,email,password_hash,accepted_disclaimer_at)
VALUES
('Demo One','demo1@example.com','$2y$10$abcdefghijklmnopqrstuv1234567890ABCDE/xyz1234567890', NOW()),
('Demo Two','demo2@example.com','$2y$10$abcdefghijklmnopqrstuv1234567890ABCDE/xyz1234567890', NOW());

INSERT INTO categories (user_id,name,type,color) VALUES
(1,'Salary','income','#10A37F'),
(1,'Food','expense','#FF4D4F'),
(1,'Transport','expense','#6600FF');

INSERT INTO accounts (user_id,name,type,opening_balance,currency) VALUES
(1,'M-PESA','mobile',5000,'KES'),
(1,'Bank','bank',0,'KES');

INSERT INTO transactions (user_id,account_id,category_id,date,description,amount,tags) VALUES
(1,1,1,'2025-08-01','August Salary',150000,'salary,august'),
(1,1,2,'2025-08-03','Groceries',-3200,'food'),
(1,1,3,'2025-08-04','Matatu',-300,'transport');

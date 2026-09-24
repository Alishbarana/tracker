CREATE DATABASE IF NOT EXISTS pulseboard;

USE pulseboard;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description VARCHAR(1000),
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('todo', 'in_progress', 'done') NOT NULL DEFAULT 'todo',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, priority, status, due_date) VALUES
('Set up CI/CD pipeline', 'Configure GitHub Actions to build and push images to GHCR', 'high', 'in_progress', '2026-09-25'),
('Write API documentation', 'Document all task endpoints for the team', 'medium', 'todo', '2026-09-28'),
('Design database schema', 'Finalize the tasks table structure', 'low', 'done', '2026-09-15');

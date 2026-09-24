const db = require('../config/db');

const VALID_STATUS = ['todo', 'in_progress', 'done'];
const VALID_PRIORITY = ['low', 'medium', 'high'];

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'title is required' });
    }
    const finalPriority = VALID_PRIORITY.includes(priority) ? priority : 'medium';

    const [result] = await db.query(
      'INSERT INTO tasks (title, description, priority, status, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, finalPriority, 'todo', due_date || null]
    );
    res.status(201).json({ id: result.insertId, title, description, priority: finalPriority, status: 'todo', due_date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;

    const [existing] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Task not found' });

    const finalStatus = VALID_STATUS.includes(status) ? status : existing[0].status;
    const finalPriority = VALID_PRIORITY.includes(priority) ? priority : existing[0].priority;

    await db.query(
      'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, due_date = ? WHERE id = ?',
      [
        title ?? existing[0].title,
        description ?? existing[0].description,
        finalPriority,
        finalStatus,
        due_date ?? existing[0].due_date,
        id
      ]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [existing] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Task not found' });

    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

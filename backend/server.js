const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check — used by the deployment pipeline and by you, to confirm
// the container is actually up before assuming a deploy succeeded
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PulseBoard API running on port ${PORT}`);
});

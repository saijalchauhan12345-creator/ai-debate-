const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ DB Error:', err));

const path = require('path');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/debate', require('./routes/debate'));

// Serve static React build files
app.use(express.static(path.join(__dirname, '../frontend/ai-debate-frontend/build')));

// Wildcard route to serve React index.html for client-side routing
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/ai-debate-frontend/build', 'index.html'));
});

app.listen(5000, () => console.log('🚀 Server running on port 5000!'));
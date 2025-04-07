require('dotenv').config(); // Load .env

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Models
const Test = require('./models/Test');

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Test MongoDB route
app.get('/test-db', async (req, res) => {
  try {
    const testDoc = new Test({ message: "Hello from Rehan's app!" });
    await testDoc.save();
    res.json({ success: true, msg: "Test document saved to MongoDB!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Failed to save test document." });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

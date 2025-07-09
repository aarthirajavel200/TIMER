import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Session from './models/Session.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.post('/api/sessions', async (req, res) => {
  try {
    console.log("📥 New Pomodoro:", req.body);
    const session = new Session(req.body);
    const saved = await session.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/sessions', async (req, res) => {
  const sessions = await Session.find().sort({ startTime: -1 });
  res.json(sessions);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port", process.env.PORT);
});

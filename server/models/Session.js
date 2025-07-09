import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  taskName: String,
  startTime: Date,
  endTime: Date,
  duration: Number, // in minutes
  status: {
    type: String,
    enum: ['completed', 'interrupted'],
    default: 'completed'
  }
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;

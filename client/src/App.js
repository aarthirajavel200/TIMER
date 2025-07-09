import { useState, useEffect } from 'react';
import { createSession } from './api';

function App() {
  const [taskName, setTaskName] = useState('');
  const [seconds, setSeconds] = useState(1500); // 25 mins
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => setSeconds(prev => prev - 1), 1000);
    } else if (seconds === 0 && isRunning) {
      stopTimer();
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const startTimer = () => {
    if (!taskName) return alert("Enter task name");
    setStartTime(new Date());
    setIsRunning(true);
  };

  const stopTimer = async () => {
    setIsRunning(false);
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 60000); // mins

    const session = {
      taskName,
      startTime,
      endTime,
      duration,
      status: seconds === 0 ? "completed" : "interrupted"
    };

    try {
      await createSession(session);
      alert("✅ Pomodoro session saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save session");
    }

    setSeconds(1500);
    setTaskName('');
    setStartTime(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Pomodoro Timer</h1>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <h2>{String(Math.floor(seconds / 60)).padStart(2, '0')}:
          {String(seconds % 60).padStart(2, '0')}</h2>
      {!isRunning ? (
        <button onClick={startTimer}>Start</button>
      ) : (
        <button onClick={stopTimer}>Stop</button>
      )}
    </div>
  );
}

export default App;

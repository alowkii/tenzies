import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Timer = ({ gameWon, hasStarted, setLastTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (hasStarted && !gameWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (time > 0) setLastTime(time);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [hasStarted, gameWon]);

  return (
    <div className="timer">
      <h2>TIME</h2>
      <h1><span>{time}</span>s</h1>
    </div>
  );
};
Timer.propTypes = {
  gameWon: PropTypes.bool.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  setLastTime: PropTypes.func.isRequired,
};

export default Timer;

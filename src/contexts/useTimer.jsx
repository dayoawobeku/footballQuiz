import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useTimer() {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLimit, setTimeLimit] = useState(120);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeRemaining(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        //come back here
        setTimeRemaining((c) => c - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning === true) {
      setIsRunning(false);
      navigate("/finish");
      //why are we clearing the interval here when the cleanup function does that??
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining, navigate]);

  return { timeRemaining, setIsRunning, timeLimit, setTimeLimit };
}

export default useTimer;

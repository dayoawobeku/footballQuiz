import { useEffect } from "react";
import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";
import { useOutletContext } from "react-router-dom";

//providing state to monitor the position of the question
//eslint-disable-next-line
function LaligaQxts() {
  const { timeRemaining, setIsRunning, count, LIGA_QXTS } = useOutletContext();
  const {  dispatch, tracker, maxQxts } = useQuestions();

  useEffect(() => {
    setIsRunning(true);
    dispatch({
      type: "startQuiz",
      payload: [
        "Champions League",
        count,
        LIGA_QXTS?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }, []);

  const selectedQuestions = LIGA_QXTS?.slice(0, maxQxts);

  return (
    <div>
      <Questions
        question={selectedQuestions?.at(tracker)}
        qxtLength={selectedQuestions?.length}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default LaligaQxts;

import { useOutletContext } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";
import { useEffect } from "react";

//providing state to monitor the position of the question
//eslint-disable-next-line
function ChampionsLeagueQxts() {
  const { timeRemaining, setIsRunning, count, CL_QXTS } = useOutletContext();
  const {  dispatch, tracker, maxQxts } = useQuestions();

  useEffect(() => {
    setIsRunning(true);
    dispatch({
      type: "startQuiz",
      payload: [
        "Champions League",
        count,
        CL_QXTS?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }, []);

  const selectedQuestions = CL_QXTS?.slice(0, maxQxts);

  //calculate the total possible points here and pass it down to the question component to enable dispatching the action

  // const totalPossiblePoints = CL_QXTS?.reduce((acc, cur) => acc + cur.point, 0);

  console.log(CL_QXTS);
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

export default ChampionsLeagueQxts;

import { useOutletContext } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";
import { useEffect } from "react";

//providing state to monitor the position of the question
//eslint-disable-next-line
function PremierLeagueQxts() {
  const { timeRemaining,  setIsRunning, count, EPL_QXT } =
    useOutletContext();
  const {  tracker, maxQxts, dispatch } = useQuestions();

  useEffect(() => {
    setIsRunning(true);
    dispatch({
      type: "startQuiz",
      payload: [
        "Premier League",
        count,
        EPL_QXT?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }, []);

  const selectedQuestions = EPL_QXT?.slice(0, maxQxts)
  return (
    <div>
      {/* {isQuestionsOpen && ( */}
        <Questions
          question={selectedQuestions?.at(tracker)}
          qxtLength={selectedQuestions?.length}
          timeRemaining={timeRemaining}
        />
      {/* )} */}
    </div>
  );
}

export default PremierLeagueQxts;

import { useOutletContext } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";
import { useEffect } from "react";

//providing state to monitor the position of the question
//eslint-disable-next-line
function PremierLeagueQxts() {
  const { timeRemaining, isQuestionsOpen, setIsRunning, count, EPL_QXT } =
    useOutletContext();
  const { questions, tracker, maxQxts, dispatch } = useQuestions();

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

  const EPL_QXTS = questions
    ?.find((ele) => ele.league === "Premier League")
    ?.questions.slice(0, maxQxts);
  console.log("eniola");

  console.log(EPL_QXTS);
  return (
    <div>
      {/* {isQuestionsOpen && ( */}
        <Questions
          question={EPL_QXTS?.at(tracker)}
          qxtLength={EPL_QXTS?.length}
          timeRemaining={timeRemaining}
        />
      {/* )} */}
    </div>
  );
}

export default PremierLeagueQxts;

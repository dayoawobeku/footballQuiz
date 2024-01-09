import { useOutletContext } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
//eslint-disable-next-line
function PremierLeagueQxts() {
  const { timeRemaining, EPL_QXT } = useOutletContext();
  const { tracker, maxQxts } = useQuestions();

  const selectedQuestions = EPL_QXT?.slice(0, maxQxts);
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

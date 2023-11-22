import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
//eslint-disable-next-line
function ChampionsLeagueQxts({ timeRemaining }) {
  const { questions, tracker, maxQxts } = useQuestions();

  const CL_QXTS = questions
    ?.find((ele) => ele.league === "Champions League")
    ?.questions.slice(0, maxQxts);

  //calculate the total possible points here and pass it down to the question component to enable dispatching the action

  // const totalPossiblePoints = CL_QXTS?.reduce((acc, cur) => acc + cur.point, 0);

  console.log(CL_QXTS);
  return (
    <div>
      <Questions
        question={CL_QXTS?.at(tracker)}
        qxtLength={CL_QXTS?.length}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default ChampionsLeagueQxts;

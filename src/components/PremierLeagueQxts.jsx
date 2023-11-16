import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
function PremierLeagueQxts() {
  const { questions, tracker, maxQxts } = useQuestions();

  const EPL_QXTS = questions?.find(
    (ele) => ele.league === "Premier League"
  )?.questions.slice (0, maxQxts);

  console.log(EPL_QXTS);
  return (
    <div>
      <Questions
        question={EPL_QXTS?.at(tracker)}
        qxtLength={EPL_QXTS?.length}
      />
    </div>
  );
}

export default PremierLeagueQxts;

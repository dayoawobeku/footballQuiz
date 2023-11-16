import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
function ChampionsLeagueQxts() {
  const { questions, tracker } = useQuestions();

 const CL_QXTS = questions?.find((ele) => ele.league === "Champions League")?.questions;
  

  console.log(CL_QXTS);
  return (
    <div>
      <Questions question={CL_QXTS?.at(tracker)}  qxtLength={CL_QXTS?.length} />
    </div>
  );
}

export default ChampionsLeagueQxts;

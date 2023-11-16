import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
function LaligaQxts() {
  const { questions, tracker } = useQuestions();

  const LA_LIGA_QXTS = questions?.find(
    (ele) => ele.league === "La Liga"
  )?.questions;

  console.log(LA_LIGA_QXTS);
  return (
    <div>
      <Questions
        question={LA_LIGA_QXTS?.at(tracker)}
        qxtLength={LA_LIGA_QXTS?.length}
      />
    </div>
  );
}

export default LaligaQxts;

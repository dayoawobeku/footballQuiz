import { useQuestions } from "../contexts/DataProvider";
import Questions from "./Questions";

//providing state to monitor the position of the question
//eslint-disable-next-line
function LaligaQxts({timeRemaining}) {
  const { questions, tracker, maxQxts } = useQuestions();

  const LA_LIGA_QXTS = questions
    ?.find((ele) => ele.league === "La Liga")
    ?.questions?.slice(0, maxQxts);

  console.log(LA_LIGA_QXTS);
  return (
    <div>
      <Questions
        question={LA_LIGA_QXTS?.at(tracker)}
        qxtLength={LA_LIGA_QXTS?.length}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default LaligaQxts;

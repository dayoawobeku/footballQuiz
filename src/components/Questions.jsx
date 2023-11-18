import { styled } from "styled-components";
import Options from "./Options";
import { useQuestions } from "../contexts/DataProvider";
import { useNavigate } from "react-router-dom";
import useTimer from "../contexts/useTimer";
// import { useState } from "react";

//eslint-disable-next-line
const StyledQuestion = styled.div`
  border: 2px solid green;
  padding: 4px;
  max-width: 350px;
  text-align: center;
`;

const Description = styled.div`
  margin-block: 10px;
`;

const Timer = styled.div`
  margin-block: 10px;
`;

const Header = styled.div`
  font-weight: 700;
  color: green;
  font-size: 1.2rem;
  padding-block: 1.5rem;
`;
function Questions({ question, qxtLength }) {
  const { dispatch, tracker, isQuestionsOpen } = useQuestions();
  const navigate = useNavigate();

  const { timeRemaining, setIsRunning, timeLimit } = useTimer();
  // const [styling, setStyling] = useState("");

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);
  console.log(timeRemaining);
  console.log(timeLimit);
  // console.log(secs);
  // console.log(mins);

  const ANSWER_VALUE = question?.correct_answer;
  const indexOfAnswer = question?.options.indexOf(ANSWER_VALUE);

  const handleClick = () => {
    if (qxtLength - 1 !== tracker) dispatch({ type: "increment" });
    else {
      setIsRunning(false);
      navigate("/finish");

      console.log(isQuestionsOpen);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <progress value={tracker + 1} max={qxtLength}></progress>
      <div style={{ marginBlock: "10px" }}>Timer</div>
      {/* for now in terms of qxt length we are working with the total number of qxts, later on we can optimize it to allow the user to select the number of questions they want to answer */}

      <Description>
        Question {tracker + 1} of {qxtLength}
      </Description>
      <Timer>
        {mins < 10 ? `0${mins}` : mins} : {secs < 10 ? `0${secs}` : secs}
      </Timer>

      <div>
        <StyledQuestion>
          <Header>{question?.question}</Header>
          {question?.options.map((option, i) => (
            <Options
              option={option}
              value={i}
              correctOption={indexOfAnswer}
              key={i}
              point={question?.point}
            />
          ))}
        </StyledQuestion>

        <div
          style={{
            marginBlock: "15px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            disabled={tracker === 0}
            onClick={() => dispatch({ type: "decrement" })}
          >
            Previous
          </button>
          <button onClick={handleClick}>
            {tracker + 1 === qxtLength ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;

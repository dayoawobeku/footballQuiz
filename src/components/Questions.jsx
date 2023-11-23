import { styled } from "styled-components";
import Options from "./Options";
import { useQuestions } from "../contexts/DataProvider";
import { useNavigate } from "react-router-dom";
import useTimer from "../contexts/useTimer";
// import { useState } from "react";

//eslint-disable-next-line
const StyledQuestion = styled.div`
  padding-top: 4px;
  max-width: 350px;
  text-align: center;
  
  margin-inline: 0;
`;

const StyledWholePage = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  left: -38px;
  width: 100vw;
  font-family: "Merriweather Sans", sans-serif;
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
  padding-block:2rem;

`;

const OPtionsWrapper = styled.div`
  background-color: white;
  padding-block: 2rem;
  padding-inline: 1.5rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const StyledButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding-block: 10px;
  padding-inline: 20px;
  border-radius: 5px;
  `

function Questions({ question, qxtLength, timeRemaining }) {
  const { dispatch, tracker, isQuestionsOpen } = useQuestions();
  const navigate = useNavigate();

  const { setIsRunning } = useTimer();
  // const [styling, setStyling] = useState("");

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);
  console.log(timeRemaining);
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
    <StyledWholePage>
      <progress value={tracker + 1} max={qxtLength}></progress>

      <Description>
        Question {tracker + 1} of {qxtLength}
      </Description>
      <Timer>
        {mins < 10 ? `0${mins}` : mins} : {secs < 10 ? `0${secs}` : secs}
      </Timer>

      <div>
        <StyledQuestion>
          <Header>{question?.question}</Header>
          <OPtionsWrapper>
            {question?.options.map((option, i) => (
              <Options
                option={option}
                value={i}
                correctOption={indexOfAnswer}
                key={i}
                point={question?.point}
              />
            ))}
          </OPtionsWrapper>
        </StyledQuestion>

        <div
          style={{
            marginBlock: "15px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <StyledButton
            disabled={tracker === 0}
            onClick={() => dispatch({ type: "decrement" })}
          >
            Previous
          </StyledButton>
          <StyledButton onClick={handleClick}>
            {tracker + 1 === qxtLength ? "Finish" : "Next"}
          </StyledButton>
        </div>
      </div>
    </StyledWholePage>
  );
}

export default Questions;

import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuestions } from "../contexts/DataProvider";
import { HiArrowLeft } from "react-icons/hi2";

import LaligaQxts from "../components/LaligaQxts";
import useTimer from "../contexts/useTimer";

import {
  StyledWholePage,
  StyledLeague as StyledLaliga,
  Header,
  QuestionPicker,
  TimePicker,
  Img,
  StyledNavLink,
} from "../ui/StyleLeagurPage";
const CustomBackButton = styled.button`
  background: white;
  border: none;
  height: 30px;
  width: 70px;
  border-radius: 12px;
  position: relative;
  left: 220px;
`;

function Laliga() {
  const navigate = useNavigate();
  const { dispatch, isQuestionsOpen, questions } = useQuestions();

  const LIGA_QXTS = questions?.find(
    (ele) => ele.league === "La Liga"
  )?.questions;
  const LIGA_QXTS_LENGTH = LIGA_QXTS.length;

  // const [isOpen, setIsOpen] = useState(false);

  const [count, setCount] = useState(1);

  const { timeRemaining, setIsRunning, timeLimit, setTimeLimit } = useTimer();

  //defining the time the quiz should start counting

  function handleTime(e) {
    const time = e.target.value;
    const chosenTime = time * 60;

    setTimeLimit(chosenTime);
  }

  function handleStart() {
    //starting the counter
    setIsRunning(true);
    dispatch({
      type: "startQuiz",
      payload: [
        "La Liga",
        count,
        LIGA_QXTS?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);

  return (
    <StyledWholePage>
      {isQuestionsOpen && (
        <>
          <StyledLaliga>
            <Header>
              <Img src="./images/laliga-logo.jpg" alt="La liga" />
              <div>La Liga</div>
              <button>&larr;</button>
            </Header>

            <QuestionPicker>
              <div>Questions</div>
              <div>
                <button
                  disabled={count === 1}
                  onClick={() => setCount((c) => c - 1)}
                >
                  -
                </button>
                <span style={{ paddingInline: "4px" }}>{count}</span>
                <button
                  disabled={count === LIGA_QXTS_LENGTH}
                  onClick={() => setCount((c) => c + 1)}
                >
                  +
                </button>
              </div>
            </QuestionPicker>

            <TimePicker>
              <div>
                {mins < 10 ? `0${mins}` : mins} :{" "}
                {secs < 10 ? `0${secs}` : secs}
              </div>

              <select
                name="time"
                className="select"
                onChange={handleTime}
                value={timeLimit}
                id="time"
              >
                <option value={2}>2 mins</option>
                <option value={4}>4 mins</option>
                <option value={5}>5 mins</option>
              </select>
            </TimePicker>


            <StyledNavLink onClick={handleStart}>Start Quiz</StyledNavLink>
            <CustomBackButton onClick={() => navigate(-1)}>
              Back
            </CustomBackButton>
          </StyledLaliga>
        </>
      )}

      {!isQuestionsOpen && <LaligaQxts timeRemaining={timeRemaining} />}
    </StyledWholePage>
  );
}

export default Laliga;

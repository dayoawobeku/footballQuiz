import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PremierLeagueQxts from "../components/PremierLeagueQxts";
import { useQuestions } from "../contexts/DataProvider";
import useTimer from "../contexts/useTimer";

import "../styles.css";
import {
  Header,
  Img,
  QuestionPicker,
  StyledNavLink,
  StyledLeague as StyledPremierLeague,
  StyledWholePage,
  TimePicker,
} from "../ui/StyleLeagurPage";
import { styled } from "styled-components";

const CustomBackButton = styled.button`
  background: white;
  border: none;
  height: 30px;
  width: 70px;
  border-radius: 12px;
  position: relative;
  left: 220px;
  cursor: pointer;
`;

function PremierLeague() {
  const navigate = useNavigate();
  const { dispatch, isQuestionsOpen, questions } = useQuestions();

  const EPL_QXT = questions?.find(
    (ele) => ele.league === "Premier League"
  )?.questions;
  const EPL_QXT_LENGTH = EPL_QXT.length;

  // const [isOpen, setIsOpen] = useState(false);

  const [count, setCount] = useState(1);

  const { timeRemaining, setIsRunning, timeLimit, setTimeLimit } = useTimer();

  function handleTime(e) {
    const time = e.target.value;
    const chosenTime = time * 60;

    setTimeLimit(chosenTime);
  }

  // function handleStart() {
  //   //starting the counter
  //   // navigate("/premierLeague/questions");
  //   // setIsRunning(true);
  //   // dispatch({
  //   //   type: "startQuiz",
  //   //   payload: [
  //   //     "Premier League",
  //   //     count,
  //   //     EPL_QXT?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
  //   //   ],
  //   // });
  // }

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);
  console.log(isQuestionsOpen);

  return (
    <StyledWholePage>
      {isQuestionsOpen && (
        <>
          <StyledPremierLeague>
            <Header>
              <Img
                src="./images/premier-league-footballquiz.jpg"
                alt="premier league"
              />
              <div>Premier League</div>
            </Header>

            <QuestionPicker>
              <div>Questions</div>
              <div>
                <button
                  onClick={() => setCount((c) => c - 1)}
                  disabled={count === 1}
                >
                  -
                </button>
                <span style={{ paddingInline: "4px" }}>{count}</span>
                <button
                  onClick={() => setCount((c) => c + 1)}
                  disabled={count === EPL_QXT_LENGTH}
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
                id="time"
                className="select"
                value={timeLimit}
                onChange={handleTime}
              >
                <option value={2}>2 mins</option>
                <option value={4}>4 mins</option>
                <option value={5}>5 mins</option>
              </select>
            </TimePicker>

            <StyledNavLink to="/premierLeague/questions">
              Start Quiz
            </StyledNavLink>
            <CustomBackButton onClick={() => navigate(-1)}>
              Back
            </CustomBackButton>
          </StyledPremierLeague>
        </>
      )}

      {/*passing the value of the min, secs, and the setisrunning to false on click of the finish button*/}
      {/*eslint-disable-next-line*/}
      {/* {!isQuestionsOpen && <PremierLeagueQxts timeRemaining={timeRemaining} />} */}

      <Outlet
        context={{
          timeRemaining,
          isQuestionsOpen,
          setIsRunning,
          count,
          EPL_QXT,
        }}
      />
    </StyledWholePage>
  );
}

export default PremierLeague;

import { useState } from "react";
import { styled } from "styled-components";

import { Outlet, useNavigate } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";

import useTimer from "../contexts/useTimer";

import {
  Header,
  Img,
  QuestionPicker,
  StyledLeague as StyledChampionsLeague,
  StyledNavLink,
  StyledWholePage,
  TimePicker,
} from "../ui/StyleLeagurPage";

const CustomBackButton = styled.button`
  background: white;
  border: none;
  height: 30px;
  width: 70px;
  cursor: pointer;
  border-radius: 12px;
  position: relative;
  left: 220px;
`;

function ChampionsLeague() {
  const navigate = useNavigate();
  const {  isQuestionsOpen, questions } = useQuestions();

  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(2);

  const CL_QXTS = questions?.find(
    (ele) => ele.league === "Champions League"
  )?.questions;

  const CL_QXTS_LENGTH = CL_QXTS?.length;

  const { timeRemaining, setIsRunning, timeLimit, setTimeLimit } = useTimer();

  //defining the time the quiz should start counting

  function handleTime(e) {
    const time = e.target.value;
    const chosenTime = time * 60;

    setTimeLimit(chosenTime);
    setSelect(e.target.value)
  }

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);

  return (
    <StyledWholePage>
      {isQuestionsOpen && (
        <>
          <StyledChampionsLeague>
            <Header>
              <Img
                src="./images/champions_league_logo.jpg"
                alt="champions league"
              />
              <div>Champions League</div>
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
                  disabled={count === CL_QXTS_LENGTH}
                  onClick={() => setCount((c) => c + 1)}
                >
                  +
                </button>
              </div>
            </QuestionPicker>

            <TimePicker>
              <div>
                {mins < 10 ? `0${mins}` : mins} :{secs < 10 ? `0${secs}` : secs}
              </div>

              <select
                name="time"
                id="time"
                className="select"
                value={select}
                onChange={handleTime}
              >
                <option value={2}>2 mins</option>
                <option value={4}>4 mins</option>
                <option value={5}>5 mins</option>
              </select>
            </TimePicker>

            {/* to implement level later */}

            <StyledNavLink to="/championsLeague/questions">
              Start Quiz
            </StyledNavLink>
            <CustomBackButton onClick={() => navigate(-1)}>
              Back
            </CustomBackButton>
          </StyledChampionsLeague>
        </>
      )}

      {/* {!isQuestionsOpen && (
        <ChampionsLeagueQxts timeRemaining={timeRemaining} />
      )} */}

      <Outlet
        context={{
          timeRemaining,
          isQuestionsOpen,
          setIsRunning,
          count,
          CL_QXTS,
        }}
      />
    </StyledWholePage>
  );
}

export default ChampionsLeague;

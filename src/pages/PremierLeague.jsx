import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import PremierLeagueQxts from "../components/PremierLeagueQxts";
import { useQuestions } from "../contexts/DataProvider";
import useTimer from "../contexts/useTimer";

const StyledNavLink = styled.button`
  padding: 4px;
  text-align: center;
  color: white;
  border-radius: 5px;
  padding: 10px;
  text-decoration: none;
  background-color: green;
  border: 8px;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50%;
  height: 50px;
  object-fit: cover;
`;

const Header = styled.div`
  border: 1px solid green;
  padding-inline: 1.5rem;
  border-radius: 13px;
  display: flex;
  justify-content: space-between;
  /* padding-inline: 1.5rem; */
  padding-block: 1.5rem;
  align-items: center;
`;

const QuestionPicker = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimePicker = styled.div`
  display: flex;
  justify-content: space-between;
  padding-block: 1.5rem;
`;

const StyledPremierLeague = styled.div`
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function PremierLeague() {
  const navigate = useNavigate();
  const { dispatch, isQuestionsOpen, questions } = useQuestions();

  const EPL_QXT = questions?.find(
    (ele) => ele.league === "Champions League"
  )?.questions;
  const EPL_QXT_LENGTH = EPL_QXT.length;

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
        "Premier League",
        count,
        EPL_QXT?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);
  // console.log(timeRemaining)

  return (
    <>
      {isQuestionsOpen && (
        <>
          <button onClick={() => navigate(-1)}>&larr;</button>
          <StyledPremierLeague>
            <Header>
              <Img
                src="./images/premier-league-footballquiz.jpg"
                alt="premier league"
              />
              <div>Premier League</div>
              <button>&larr;</button>
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
                {mins} : {secs}
              </div>

              <select
                name="time"
                id="time"
                value={timeLimit}
                onChange={handleTime}
              >
                <option value={2}>2 mins</option>
                <option value={4}>4 mins</option>
                <option value={5}>5 mins</option>
              </select>
            </TimePicker>

            {/* to implement level later */}

            <StyledNavLink onClick={handleStart}>Start Quiz</StyledNavLink>
          </StyledPremierLeague>
        </>
      )}

      {/*passing the value of the min, secs, and the setisrunning to false on click of the finish button*/}

      {!isQuestionsOpen && <PremierLeagueQxts />}
    </>
  );
}

export default PremierLeague;

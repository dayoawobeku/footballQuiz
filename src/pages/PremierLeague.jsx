import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

import PremierLeagueQxts from "../components/PremierLeagueQxts";
import { useQuestions } from "../contexts/DataProvider";
import useTimer from "../contexts/useTimer";

import '../styles.css';
import BackButton from "../ui/BackButton";
import { Header, Img, QuestionPicker, StyledNavLink, StyledLeague as StyledPremierLeague, StyledWholePage, TimePicker } from "../ui/StyleLeagurPage";



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
  console.log(timeRemaining);

  return (
    <StyledWholePage>
      {isQuestionsOpen && (
        <>
          <BackButton  onClick={() => navigate(-1)}>
            <HiArrowLeft style={{fontWeight: 'bold'}} />
          </BackButton>
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
                {mins < 10 ? `0${mins}`: mins} : {secs < 10 ? `0${secs}`: secs}
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

            {/* to implement level later */}

            <StyledNavLink onClick={handleStart}>Start Quiz</StyledNavLink>
          </StyledPremierLeague>
        </>
      )}

      {/*passing the value of the min, secs, and the setisrunning to false on click of the finish button*/}
      {/*eslint-disable-next-line*/}
      {!isQuestionsOpen && <PremierLeagueQxts timeRemaining={timeRemaining} />}
    </StyledWholePage>
  );
}

export default PremierLeague;

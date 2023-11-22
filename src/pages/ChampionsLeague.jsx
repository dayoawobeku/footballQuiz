import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../contexts/DataProvider";
import ChampionsLeagueQxts from "../components/ChampionsLeagueQxts";
import {
  Header,
  Img,
  QuestionPicker,
  StyledLeague as StyledChampionsLeague,
  StyledNavLink,
  StyledWholePage,
  TimePicker,
} from "../ui/StyleLeagurPage";
import useTimer from "../contexts/useTimer";
import BackButton from "../ui/BackButton";
import { HiArrowLeft } from "react-icons/hi2";

function ChampionsLeague() {
  const navigate = useNavigate();
  const { dispatch, isQuestionsOpen, questions } = useQuestions();

  const [count, setCount] = useState(1);

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
  }

  function handleStart() {
    //starting the counter
    setIsRunning(true);
    dispatch({
      type: "startQuiz",
      payload: [
        "Champions League",
        count,
        CL_QXTS?.slice(0, count).reduce((acc, cur) => acc + cur.point, 0),
      ],
    });
  }

  const secs = timeRemaining % 60;
  const mins = Math.floor(timeRemaining / 60);

  return (
    <StyledWholePage>
      {isQuestionsOpen && (
        <>
          <BackButton onClick={() => navigate(-1)}>
            <HiArrowLeft style={{ fontWeight: "bold" }} />
          </BackButton>
          <StyledChampionsLeague>
            <Header>
              <Img
                src="./images/champions_league_logo.jpg"
                alt="champions league"
              />
              <div>Champions League</div>
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
          </StyledChampionsLeague>
        </>
      )}

      {!isQuestionsOpen && <ChampionsLeagueQxts timeRemaining={timeRemaining}/>}
    </StyledWholePage>
  );
}

export default ChampionsLeague;

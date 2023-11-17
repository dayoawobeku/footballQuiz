import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useState } from "react";
import { useQuestions } from "../contexts/DataProvider";
import LaligaQxts from "../components/LaligaQxts";

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

const StyledLaliga = styled.div`
  padding-inline: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Laliga() {
  const navigate = useNavigate();
  const { dispatch, isQuestionsOpen, questions } = useQuestions();

  const LIGA_QXTS = questions?.find(
    (ele) => ele.league === "Champions League"
  )?.questions;
  const LIGA_QXTS_LENGTH = LIGA_QXTS.length;

  // const [isOpen, setIsOpen] = useState(false);

  const [count, setCount] = useState(1);

  return (
    <>
      {isQuestionsOpen && (
        <>
          <button onClick={() => navigate(-1)}>&larr;</button>
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
              <div>Time Frame</div>

              <select name="time" id="time">
                <option value="2">2 mins</option>
                <option value="4">4 mins</option>
                <option value="5">5 mins</option>
              </select>
            </TimePicker>

            {/* to implement level later */}

            <StyledNavLink
              onClick={() =>
                dispatch({
                  type: "startQuiz",
                  payload: [
                    "La Liga",
                    count,
                    LIGA_QXTS?.slice(0, count).reduce(
                      (acc, cur) => acc + cur.point,
                      0
                    ),
                  ],
                })
              }
            >
              Start Quiz
            </StyledNavLink>
          </StyledLaliga>
        </>
      )}

      {!isQuestionsOpen && <LaligaQxts />}
    </>
  );
}

export default Laliga;

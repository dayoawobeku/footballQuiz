import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import PremierLeagueQxts from "../components/PremierLeagueQxts";
import { useQuestions } from "../contexts/DataProvider";

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

  const EPL_QXT_LENGTH = questions?.find((ele) => ele.league === "Champions League")
    ?.questions.length;

  // const [isOpen, setIsOpen] = useState(false);

  const [count, setCount] = useState(1);

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
              <div>Champions League</div>
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
                dispatch({ type: "startQuiz", payload: ["Premier League", count] })
              }
            >
              Start Quiz
            </StyledNavLink>
          </StyledPremierLeague>
        </>
      )}

      {!isQuestionsOpen && <PremierLeagueQxts />}
    </>
  );
}

export default PremierLeague;

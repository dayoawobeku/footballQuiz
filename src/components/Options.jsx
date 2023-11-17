import { styled, css } from "styled-components";
import { useState } from "react";
import { useQuestions } from "../contexts/DataProvider";

const variation = {
  correct: css`
    border: 1px solid green;
  `,
  wrong: css`
    border: 1px solid red;
  `,
  normal: css`
    border: none;
  `,
};

const StyledButton = styled.button`
  ${(prop) =>
    variation[prop.status] ? variation[prop.status] : `${variation.normal}`}

  //changed from empty string to normal
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
`;

function Options({ option, value, correctOption, point }) {
  const { dispatch, answer, totalPoints } = useQuestions();

  const hasAnswered = answer !== null;
  // const [styling, setStyling] = useState("");

  console.log(value, correctOption);

  function handleCorrectOption() {
    //if the the correction is same as the answer chosen add to totalPoints

    //check if the answer is correct
    const ansCheck = correctOption === value ? totalPoints + point : totalPoints;
    dispatch({ type: "checkAnswer", payload: [correctOption, ansCheck] });
    console.log({ totalPoints, point });
    console.log({answer, value})
    console.log(ansCheck);
  }

  return (
    <StyledButton
      status={hasAnswered ? (answer === value ? "correct" : "wrong") : ""}
      onClick={handleCorrectOption}
    >
      {option}
    </StyledButton>
  );
}

StyledButton.defaultProps = {
  status: "normal",
};

export default Options;

//only concerned with two values
//1) the clicked option and the correct answer
//check for these two and work on thenm

//the logic goes like this:
//1) if the person picks the correct option, only the correct option gets the styling
//2) if the person picks the wrong option, both the wrong option that was chosen and the correct option get the styling

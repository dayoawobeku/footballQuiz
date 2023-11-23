import { styled, css } from "styled-components";
import { useState } from "react";
import { useQuestions } from "../contexts/DataProvider";
import "../styles.css";



function Options({ option, value, correctOption, point }) {
  //using context api to store my stateful logic
  const { dispatch, answer, totalPoints } = useQuestions();

  const hasAnswered = answer !== null;
  // const [styling, setStyling] = useState("");

  console.log(value, correctOption);

  function isCorrect(selectedOption) {
    return hasAnswered && correctOption === selectedOption;
  }
  function isWrong(selectedOption) {
    return (
      hasAnswered && !isCorrect(selectedOption) && answer === selectedOption
    );
  }
  console.log(isCorrect(value));

  function handleCorrectOption() {
    //if the the correction is same as the answer chosen add to totalPoints

    const ansCheck =
      correctOption === value ? totalPoints + point : totalPoints;

    dispatch({ type: "checkAnswer", payload: [value, ansCheck] });
  }

  return (
    <button
      className={`option ${hasAnswered && correctOption === value ? "correct" : ""} ${
        isWrong(value) ? "wrong" : ""
      }`}
      onClick={handleCorrectOption}
      disabled={hasAnswered}
    >
      {option}
    </button>
  );
}



export default Options;

//only concerned with two values
//1) the clicked option and the correct answer
//check for these two and work on thenm

//the logic goes like this:
//1) if the person picks the correct option, only the correct option gets the styling
//2) if the person picks the wrong option, both the wrong option that was chosen and the correct option get the styling

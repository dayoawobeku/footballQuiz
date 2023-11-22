import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import './custom.css'
import "react-circular-progressbar/dist/styles.css";

import { styled } from "styled-components";
import { useQuestions } from "../contexts/DataProvider";

const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

const Final = styled.div`
  border: 2px solid green;
  margin: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  border-radius: 10px;
  padding-block: 30px;
`;

const Button = styled(Link)`
  padding: 10px;
  background-color: green;
  text-decoration: none;
  color: black;
  border: none;
`;

function FinishScreen() {
  const { leagueType, totalPoints, maxPossiblePoint, dispatch } =
    useQuestions();

  function handleFinish() {
    dispatch({ type: "finish" });
  }

  const percentage = Math.round((totalPoints / maxPossiblePoint) * 100);
  console.log(percentage);

  return (
    <Final>
      {/* <Img
        src={`${
          leagueType === "Premier League"
            ? "/images/Premier_League.webp"
            : leagueType === "Champions League"
            ? "/images/champions_league_logo.jpg"
            : "/images/laliga-logo.jpg"
        }`}
        alt=""
      /> */}

      <div style={{ width: 150, height: 150 }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathTransitionDuration: 8.8,
          })}
        />
      </div>
      <div>
        Total Score : {totalPoints} of {maxPossiblePoint}
      </div>
      <div>Good</div>
      <div>Progress</div>
      <Button onClick={handleFinish} to="/">
        Go To Home
      </Button>
    </Final>
  );
}

export default FinishScreen;

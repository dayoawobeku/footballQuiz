import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import './custom.css'
import "react-circular-progressbar/dist/styles.css";

import { css, styled } from "styled-components";
import { useQuestions } from "../contexts/DataProvider";
import { HiHome } from "react-icons/hi2";

const Final = styled.div`
  height: 100vh;
  /* margin: 40px; */
  display: flex;
  background-color: lightgreen;
  font-family: "Merriweather Sans", sans-serif;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  border-radius: 10px;
  opacity: 0.8;
  padding-block: 70px;
`;

const variation = {
  home: css`
    background-color: #555454;
    width: 40px;
  `,
  away: css`
    background-color: green;
  `,
};

const FinalWrapper = styled.div`
  background-image: url("./images/final-bg.webp");
  height: 100dvh;
`;

const Button = styled(Link)`
  ${(prop) =>
    prop["data-variation"] === "home" ? variation.home : variation.away}
  margin-right: 10px;
  padding-inline: 8px;
  padding-block: 8px;
  font-family: "Permanent Marker", cursive;
  border-radius: 8px;
  display: grid;
  place-items: center;
  text-decoration: none;
  color: white;
  border: none;
`;

function FinishScreen() {
  const { totalPoints, maxPossiblePoint, dispatch } = useQuestions();

  function handleFinish() {
    dispatch({ type: "finish" });
  }

  const percentage = Math.round((totalPoints / maxPossiblePoint) * 100);
  console.log(percentage);

  return (
    <FinalWrapper>
      <Final>
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 8.8,
              pathColor: "green",
              textColor: "green",
            })}
          />
        </div>
        <div>
          Total Score : {totalPoints} of {maxPossiblePoint}
        </div>
        {percentage > 0 && percentage < 50 && <div>Poor</div>}
        {percentage > 50 && percentage < 80 && <div>Good 👌 </div>}
        {percentage > 80 && <div>Excellent ✌️</div>}
        <div style={{ display: "flex" }}>
          <Button data-variation="home" onClick={handleFinish} to="/">
            <HiHome style={{ color: "white", fontSize: "20px" }} />
          </Button>
          <Button data-variation="away">PLAY AGAIN</Button>
        </div>
      </Final>
    </FinalWrapper>
  );
}

export default FinishScreen;

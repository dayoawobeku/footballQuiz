import { Link } from "react-router-dom";
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
  const { leagueType } = useQuestions();

  return (
    <Final>
      <Img
        src={`${
          leagueType === "Premier League"
            ? "/images/Premier_League.webp"
            : leagueType === "Champions League"
            ? "/images/champions_league_logo.jpg"
            : "/images/laliga-logo.jpg"
        }`}
        alt=""
      />
      <div>Total Score : 4 of 5</div>
      <div>Good</div>
      <div>Progress</div>
      <Button to="/">Go To Home</Button>
    </Final>
  );
}

export default FinishScreen;

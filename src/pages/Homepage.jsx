import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { HiMiniPlay } from "react-icons/hi2";
import StyledNavLink from "../ui/StyledButton";

const StyledHomePage = styled.div`
  background-color: lightgreen;
  padding-block: 15px;
  height: 100dvh;
  display: flex;
  /* padding-inline: 3rem; */
  flex-direction: column;
  font-family: "Merriweather sans", sans-serif;
  align-items: center;
`;

const Header = styled.header`
  color: green;
  font-size: 30px;
  font-weight: 400;
  padding-top: 8px;
  margin-bottom: 80px;
`;



function Homepage() {
  return (
    <StyledHomePage>
      <Header>Quiz App</Header>

      <img
        src="./images/football2-removebg.png"
        alt="football players"
        style={{ height: "140px", width: "140px" }}
      />
      <div
        style={{
          fontWeight: "800",
          fontSize: "40px",
          color: "white",
          marginBottom: "50px",
          width: "180px",
          textAlign: "center",
        }}
      >
        Football Quiz
      </div>
      <StyledNavLink to="/selection">
        <HiMiniPlay style={{ fontSize: "20px" }} />
        <div>Start Quiz</div>
      </StyledNavLink>
    </StyledHomePage>
  );
}

export default Homepage;

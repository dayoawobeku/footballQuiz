import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const StyledHomePage = styled.div`
  background-color: lightgreen;
  padding-block: 15px;
  height: 100dvh;
  display: flex;
  padding-inline: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.header`
  color: green;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  padding-top: 8px;
`;

const StyledNavLink = styled(NavLink)`
  background-color: green;
  border: none;
  text-align: center;
  text-decoration: none;
  border-radius: 7px;
  padding: 15px 20px;
  width: 200px;
  color: white;
`;

function Homepage() {
  return (
    <StyledHomePage>
      <Header>Welcome to the Ultimate Sports Quiz App</Header>
      <div>
        <img src="./images/Premier_League.webp" alt="football players" />
      </div>
      <StyledNavLink to='/selection'>Star Quiz</StyledNavLink>
    </StyledHomePage>
  );
}

export default Homepage;

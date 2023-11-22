import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { HiArrowLeft } from "react-icons/hi2";
import BackButton from "../ui/BackButton";

const StyledSelection = styled.div`
  display: grid;
  gap: 15px;
`;

const StyledNavLink = styled(NavLink)`
  padding: 4px;
  text-align: center;
  color: white;
  border-radius: 5px;
  padding: 10px;
  text-decoration: none;
  background-color: green;
  border: 8px;
`;

const StyledWholePage = styled.div`
  background-color: lightgreen;
  height: 100dvh;
  font-family: "Merriweather Sans", sans-serif;
`;



function Selection() {
  const navigate = useNavigate();

  return (
    <StyledWholePage>
      <BackButton  onClick={() => navigate(-1)}>
        <HiArrowLeft />
      </BackButton>
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h1>Take a Quiz</h1>
        <p>Pick a Section</p>
      </div>

      <StyledSelection>
        <StyledNavLink to="/premierLeague">Premier League</StyledNavLink>
        <StyledNavLink to="/laLiga">La Liga</StyledNavLink>
        <StyledNavLink to="/championsLeague">Champions League</StyledNavLink>
      </StyledSelection>
    </StyledWholePage>
  );
}

export default Selection;

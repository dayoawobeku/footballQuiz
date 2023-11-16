import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyledSelection = styled.div`
  display: grid;
  /* grid-template-columns: 400px 400px; */
  
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

function Selection() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>&larr;</button>
      <h1>Take a Quiz</h1>
      <p>Pick a Section</p>

      <StyledSelection>
        <StyledNavLink to='/premierLeague'>Premier League</StyledNavLink>
        <StyledNavLink to='/laLiga'>La Liga</StyledNavLink>
        <StyledNavLink to='/championsLeague'>Champions League</StyledNavLink>
      </StyledSelection>
    </div>
  );
}

export default Selection;

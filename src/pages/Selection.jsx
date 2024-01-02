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
  padding: 50px;
  font-family: "Merriweather Sans", sans-serif;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

function Selection() {
  const navigate = useNavigate();

  return (
    <StyledWholePage>
      <Wrapper>
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
          }}
        >
          <Header>
            <BackButton onClick={() => navigate(-1)}>
              <HiArrowLeft />
            </BackButton>
            <h1 style={{ maxWidth: "700px", marginInline: "auto" }}>
              Take a Quiz
            </h1>
          </Header>
          <p>Pick a Section</p>
        </div>

        <StyledSelection>
          <StyledNavLink to="/premierLeague">Premier League</StyledNavLink>
          <StyledNavLink to="/laLiga">La Liga</StyledNavLink>
          <StyledNavLink to="/championsLeague">Champions League</StyledNavLink>
        </StyledSelection>
      </Wrapper>
    </StyledWholePage>
  );
}

export default Selection;

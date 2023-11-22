import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const StyledNavLink = styled(NavLink)`
  background-color: green;
  border: none;
  display: flex;
  gap: 50px;
  text-align: center;
  text-decoration: none;
  border-radius: 7px;
  padding: 15px 20px;
  width: 200px;
  color: white;
`;

export default StyledNavLink
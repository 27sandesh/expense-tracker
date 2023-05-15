import { NavLink, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar>
      <NavLink as={Link} to="/DashBoard">
        DashBoard
      </NavLink>
      <NavLink as={Link} to="/Login">
        Login
      </NavLink>
    </Navbar>
  );
};
export default Header;

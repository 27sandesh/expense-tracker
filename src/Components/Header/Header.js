import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
      </Container>

      <Nav>
        {"your profile is incomplete compelte now" && (
          <Nav.Link as={Link} to="/update-profile" style={{ color: "blue" }}>
            Update Profile
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;

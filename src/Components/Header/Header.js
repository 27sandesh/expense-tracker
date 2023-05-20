import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataContext from "../Store/data-context";
import { useContext } from "react";

const Header = () => {
  const AUTHctx = useContext(DataContext);
  console.log("msg", AUTHctx.token);
  const token = AUTHctx.token;

  const VerifyEmailHandler = () => {
    if (!token) {
      console.log("User not authenticated.");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Verification email sent successfully.");
        } else {
          throw new Error("Error sending verification email.");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
      <Button onClick={VerifyEmailHandler}>Verify Email</Button>

      <Nav>
        {false && (
          <Nav.Link as={Link} to="/update-profile" style={{ color: "blue" }}>
            Update Profile
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;

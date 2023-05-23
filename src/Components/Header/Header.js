import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataContext from "../Store/data-context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../Index/Index";
const Header = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth.isAuthenticated);
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
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        {Auth && (
          <Navbar.Brand as={Link} to="/dashboard">
            Dashboard
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Nav className="mr-auto">
          {!Auth && (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
        {Auth && <Button onClick={logoutHandler}>Log-Out</Button>}
      </Container>
      {Auth && <Button onClick={VerifyEmailHandler}>Verify Email</Button>}

      {Auth && (
        <Nav>
          <Nav.Link as={Link} to="/update-profile" style={{ color: "blue" }}>
            Update Profile
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;

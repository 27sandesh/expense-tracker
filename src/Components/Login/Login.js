import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../Store/data-context";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../Index/Index";
import { ThemeActions } from "../Index/Index";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);
  const history = useHistory();
  const Authctx = useContext(DataContext);
  const emailInputRef = useRef();
  const PasswordInputRef = useRef();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function SwithAuthModeHandler() {
    setisLoggedIn((prevState) => !prevState);
  }

  function submitHandler(event) {
    event.preventDefault();
    const EnterdEmail = emailInputRef.current.value;
    const EnterdPassword = PasswordInputRef.current.value;
    let url;
    if (isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY";
    }
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: EnterdEmail,
        password: EnterdPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            localStorage.setItem("login", JSON.stringify(data));
            Authctx.Login(data.idToken);
            console.log(data.idToken);
            // window.location.href = "/DashBoard";
            dispatch(AuthActions.login(data.idToken));
            history.replace("/DashBoard");

            console.log(data);
          });
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      })
      .finally(() => {
        // Set the loading state to false after the fetch is complete
        setIsLoading(false);
      });
  }
  function forgetpasswordhandler() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("code sent to email");
        } else {
          throw new Error("Error sending verification email.");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <section className={`container ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="mt-4">{isLoggedIn ? "sign-up" : "Login"}</h1>
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              required
              ref={emailInputRef}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10 row mb-3">
            <input
              type="password"
              className="form-control"
              required
              ref={PasswordInputRef}
            />
          </div>
          <div className="col-sm-6 text-right">
            <button
              onClick={forgetpasswordhandler}
              className="btn btn-secondary"
            >
              forget password? click here
            </button>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : isLoggedIn ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button
              className="btn btn-secondary"
              onClick={SwithAuthModeHandler}
            >
              {isLoggedIn ? "Create an Account" : "Login with Existing Account"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;

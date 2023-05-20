import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import DataContext from "../Store/data-context";

const Login = () => {
  const history = useHistory();
  const Authctx = useContext(DataContext);
  const emailInputRef = useRef();
  const PasswordInputRef = useRef();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  function SwithAuthModeHandler() {
    setisLoggedIn((prevState) => !prevState);
  }
  const EnterdEmail = emailInputRef.current.value;
  const EnterdPassword = PasswordInputRef.current.value;
  function submitHandler(event) {
    event.preventDefault();

    let url;
    if (isLoggedIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY";
    }
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
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          localStorage.setItem("login", JSON.stringify(data));
          Authctx.Login(data.idToken);
          console.log(data.idToken);
          window.history.pushState(null, null, "/DashBoard");

          //  history.repalce("/DashBoard");
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  }
  function forgetpasswordhandler() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB0dJAXTRrEtEpkORTaa2uVCWs1LHzJGgY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: EnterdEmail,
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
    <section className="container">
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
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              required
              ref={PasswordInputRef}
            />
          </div>
          <div>
            <button onClick={forgetpasswordhandler}>
              forget password? click here
            </button>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary mb-2">
              {isLoggedIn ? "Login" : "Create Account"}
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

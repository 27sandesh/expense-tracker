import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const PasswordInputRef = useRef();
  const [isLoggedIn, setisLoggedIn] = useState(false);
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
          window.location.href = "/DashBoard";
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        });
      }
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

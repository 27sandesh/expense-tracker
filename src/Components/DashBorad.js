import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import DataContext from "./Store/data-context";

const DashBoard = () => {
  const Authctx = useContext(DataContext);
  const token = Authctx.token;

  function LogoutHandler(e) {
    e.preventDefault();
    window.location.href = "/Login";
  }

  function EmailVerificationHandler() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY",
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
          return res.json();
        } else {
          throw new Error("Email verification failed.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div>
      <section>
        <h1>Welcome to the Expense Tracker</h1>
        <Button onClick={EmailVerificationHandler}>Verify email</Button>
        <Button onClick={LogoutHandler}>Logout</Button>
      </section>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="money" className="form-control">
                Money $:
              </label>
              <input type="number" className=" col-sm-2" />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-control">
                Description:
              </label>
              <input type="text" className=" col-sm-2" />
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-control">
                Category:
              </label>
              <select className=" col-sm-2">
                <option>Food</option>
                <option>Movie</option>
                <option>Dinner</option>
              </select>
            </div>
            <div className="form-group">
              {" "}
              <Button>Add</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import DataContext from "./Store/data-context";
import { useRef } from "react";
const DashBoard = () => {
  const Authctx = useContext(DataContext);
  const token = Authctx.token;
  const MoneyInputref = useRef();
  const DisInputRef = useRef();
  const CategoryInputRef = useRef();

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
  function submitHandler(e) {
    e.preventDefault();
    const EnterdMoney = MoneyInputref.current.value;
    const EnterdDis = DisInputRef.current.value;
    const EntredCategory = CategoryInputRef.current.value;
    fetch(
      "https://expense-tracker-13c13-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify({
          price: EnterdMoney,
          discription: EnterdDis,
          Category: EntredCategory,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          localStorage.setItem("expenses", JSON.stringify(data));
          console.log(data);
        });
      } else {
        console.log(res.error.message);
      }
    });
  }
  const expense = JSON.parse(localStorage.getItem("expenses"));
  return (
    <div>
      <section>
        <h1>Welcome to the Expense Tracker</h1>
        <Button onClick={EmailVerificationHandler}>Verify email</Button>
        <Button onClick={LogoutHandler}>Logout</Button>
      </section>
      <div className="card">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="money" className="form-control">
              Money $:
            </label>
            <input type="number" className=" col-sm-2" ref={MoneyInputref} />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-control">
              Description:
            </label>
            <input type="text" className=" col-sm-2" ref={DisInputRef} />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-control">
              Category:
            </label>
            <select className=" col-sm-2" ref={CategoryInputRef}>
              <option>Food</option>
              <option>Movie</option>
              <option>Dinner</option>
            </select>
          </div>
          <div className="form-group">
            {" "}
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;

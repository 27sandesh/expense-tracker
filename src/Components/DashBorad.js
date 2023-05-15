import React from "react";
import { Button } from "react-bootstrap";
const DashBoard = () => {
  function LogoutHandler(e) {
    e.preventDefault();

    window.location.href = "/Login";
  }
  return (
    <div>
      <h1>Welecome to the expense Tracker</h1>
      <Button onClick={LogoutHandler}>Logout</Button>
    </div>
  );
};
export default DashBoard;

import "./App.css";
import DashBoard from "./Components/DashBorad";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Update from "./Components/Updateprofile/UpdateProfile";
function App() {
  return (
    <div className="App">
      <header>
        <Header></Header>
      </header>
      <main>
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/DashBoard">
            <DashBoard />
          </Route>
          <Route path="/update-profile">
            <Update />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;

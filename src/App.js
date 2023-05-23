import "./App.css";
import DashBoard from "./Components/DashBorad";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Update from "./Components/Updateprofile/UpdateProfile";
import { useSelector } from "react-redux";
function App() {
  const Auth = useSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={`container ${theme}`}>
      <header>
        <Header></Header>
      </header>
      <main>
        <Switch>
          {!Auth && (
            <Route path="/Login">
              {" "}
              <Login />
            </Route>
          )}
          {Auth && (
            <Route path="/DashBoard">
              {" "}
              <DashBoard />
            </Route>
          )}
          {Auth && (
            <Route path="/update-profile">
              <Update />
            </Route>
          )}
        </Switch>
      </main>
    </div>
  );
}

export default App;

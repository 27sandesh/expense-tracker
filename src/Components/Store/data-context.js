import React, { useState } from "react";
const DataContext = React.createContext({
  token: "",
  Login: () => {},
});
export default DataContext;
export const DataContextProvider = (props) => {
  const intialtoken = localStorage.getItem("token");
  const [token, settoken] = useState(intialtoken);
  const loginHandler = (token) => {
    settoken(token);
    localStorage.getItem("token", token);
    console.log("login", token);
  };
  return (
    <DataContext.Provider
      value={{
        token: token,
        Login: loginHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

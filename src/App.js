import logo from "./logo.svg";
import "./App.css";
import ViewComponent from "./component/viewcomponent";
import Secondcomponent from "./component/secondcomponent";
import PaymEmployeeForm from "./components/paymEmployee/paymEmployeeForm";
import CustomizedTables from "./components/paymEmployee/CustomizedTables";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import MainPage from "./components/nav";
// import ServiceCard from './components/servicecard';
import LoginForm from "./components/Authentication/Login";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoginOthers from "./components/Authentication/LoginOthers";
function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const loggedIn = sessionStorage.getItem("user") !== null;
    setIsLoggedIn(loggedIn);
    setLogin(loggedIn);
  }, []);

  function changeState(state) {
    setLogin(state);
  }

  return (
    <div className="App">
      {console.log(props.state)}
      {/* <MainPage /> */}
       <ErrorBoundary> 
         {login ? (
          <div>Welcome {sessionStorage.getItem("user")}</div>
        ) : (
          <LoginForm isLoggedIn={changeState} />
        )} 
      </ErrorBoundary> 
      <Outlet />
    </div>
  );
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(App);

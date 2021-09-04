import React, { Component } from "react";
import "./Stylesheets/App.css";
import Home from "./components/Home";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import HeaderAdmin from "./components/Layout/HeaderAdmin";
import AddBook from "./components/Books/AddBook";

// These codes are added by Homy below
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  // setJWTToken needs to be coded for token
  //setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <HeaderAdmin />
            {/* <Header /> */}
            {
              //Public Routes
            }
           
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Route exact path="/home" component={Home} />
            <Route exact path="/addPerson" component={AddPerson} />

            {/* Routing to the page where the admin can add a book */}
            <Route exact path="/addbook" component={AddBook} />
          
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
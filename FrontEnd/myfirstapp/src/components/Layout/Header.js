import React, { Component } from 'react'
import Profile from "../Persons/Profile";
import Admin from "../Admin/admin";
import profilePic from '../../Images/profileImage.png'

 class Header extends Component {
    render() {
        let loggedInUser = "";
        if (localStorage.getItem("user") != null) {
            loggedInUser = localStorage.getItem("user");
        }
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        {/* Left  of the Nvaigation Bar */}
                        <ul className="nav navbar-nav pull-sm-left">
                            <li className="nav-item">
                                <a className="navbar-brand" href="home">
                                    <img src= {profilePic} width="50" height="50" className="rounded-circle"></img>
                                </a>
                            </li>
                        </ul>

                        <ul className="nav navbar-nav pull-sm-left">
                            <li className="navbar-brand" href="home">
                                <a>
                                    {loggedInUser}
                                </a>
                            </li>
                        </ul>

                        {/* Centre of the navigation bar */}
                        <ul className="nav navbar-nav navbar-logo mx-auto">
                            <li className="nav-item">
                                <a className="navbar-brand adminNavBar" href="/">
                                    Bookeroo
                                </a>
                            </li>
                        </ul>

                        {/* Right of the navigaton bar */}
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link " href="register">
                                    Sign Up
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="login">
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href ="logout">
                                    Logout
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href ="admin">
                                    Admin
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header;
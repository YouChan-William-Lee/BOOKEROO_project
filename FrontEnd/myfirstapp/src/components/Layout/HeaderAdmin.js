import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class HeaderAdmin extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    {/* Left  of the Nvaigation Bar */}
                    <ul className="nav navbar-nav pull-sm-left">
                        <li className="nav-item">
                            <a className="navbar-brand" href="#">
                                <img src="/images/DSC_5703.jpg" width="30" height="30"></img>
                            </a>
                        </li>
                    </ul>

                    {/* Centre of the navigation bar */}
                    <ul className="nav navbar-nav navbar-logo mx-auto">
                        <li className="nav-item">
                            <a className="navbar-brand adminNavBar" href="Dashboard.html">
                                Bookeroo
                            </a>
                        </li>
                    </ul>

                    {/* Right of the navigagtion bar */}
                    <ul className="nav navbar-nav pull-sm-right">
                        <li className="nav-item">
                            <Link to='/addbook'><button className="btn btn-light my-2 my-sm-0 addBookButton">Add Book</button></Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-light my-2 my-sm-0 logOutButton">Log Out</button>
                        </li>
                    </ul>

                
                </div>
                </nav>
            </div>
        )
    }
}

export default HeaderAdmin;

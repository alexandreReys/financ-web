import React from "react";
import { Link } from "react-router-dom";
import * as loginService from "services/loginService";
import { connect } from "react-redux";
import store from "store";

import "./styles.css";

const navLoggedUser = (loggedUser) => {
    return (
        <div
            className="logged-user text-light"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
        >
            <span>{loggedUser}</span>
            <button
                className="btn-logout ml-3"
                onClick={() => {
                    loginService.logout();
                }}
            >
                Logout
            </button>
        </div>
    );
};

const navButtonCollapse = () => {
    return (
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#deliveryNavibar"
            aria-controls="deliveryNavibar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
    );
};

const Nav = ({ loggedUser, adminModule }) => {
    return (
        <nav
            id="navbar"
            className="navbar navbar-expand-md navbar-dark fixed-top bg-dark"
        >
            {/* navbar-brand */}
            <Link className="navbar-brand" to="/">
                {store.getState().defaultState.appTitle}
            </Link>

            {navButtonCollapse()}

            <div className="collapse navbar-collapse" id="deliveryNavibar">
                <div className="navbar-address mr-auto"></div>

                {adminModule && !!loggedUser && navLoggedUser(loggedUser)};
            </div>
        </nav>
    );
};

export default connect((state) => ({
    loggedUser: state.loginState.loggedUser,
    adminModule: state.defaultState.adminModule,
}))(Nav);

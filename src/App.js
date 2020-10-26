import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";
import store from "store";

import "./global.css";

import Nav from "components/nav/Nav";
import Aside from "components/aside/Aside";
import Routes from "routes/Routes";
import Footer from "components/footer/Footer";
import { history } from "routes/history";

const App = ({ adminModule }) => {
  useEffect(() => {
    const appTitle = store.getState().defaultState.appTitle;
    document.title = `${appTitle}`;
  }, []);

  return (
    <div className="App container-fluid">
      <Router history={history}>
        <Nav />

        {!adminModule && <Routes />}

        {adminModule && (
          <content className="app-content">
            <Aside className="app-aside" />
            <Routes />
          </content>
        )}

        <Footer />
      </Router>
    </div>
  );
};

export default connect((state) => ({
  adminModule: state.defaultState.adminModule,
}))(App);

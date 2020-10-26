import React from "react";
import store from "store";

import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <span className="f1">{store.getState().defaultState.appTitle}</span>
        {/* <span className="f2">Beba com moderação</span> */}
      </div>
    </footer>
  );
};

export default Footer;

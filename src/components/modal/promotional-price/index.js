import React from "react";

import "./style.css";

export const PromotionalPrice = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="main-promotional-price">
        {children}
        <button className="close-button-promotional-price" onClick={handleClose}>
          X
        </button>
      </section>
    </div>
  );
};

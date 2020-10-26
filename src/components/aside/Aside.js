import React from "react";
import { history } from "routes/history";

import "./styles.css";

const Aside = () => {
  return (
    <aside className="app-aside">
      <div className="container-aside">

        <p
          onClick={() => {
            history.push("/notifications");
            return;
          }}
        >
          Tabela SAC
        </p>

      </div>
    </aside>
  );
};

export default Aside;

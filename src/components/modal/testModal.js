import React, { useState } from "react";
import Modal from "./modal";

import "./testModal.css";

const TestModal = () => {
  const [show, setShow] = useState(false);

  const ModalContent = () => (
    <>
      <br />
      <h1>
        <b>Atenção !!</b>
      </h1>
      <h5>Valor do Troco deve ser maior que o valor da compra !!</h5>
    </>
  );

  return (
    <main className="test-modal">
      <h1>React Modal</h1>

      <Modal show={show} handleClose={() => setShow(false)}>
        <ModalContent />
      </Modal>

      <button
        type="button"
        className="openButton"
        onClick={() => setShow(true)}
      >
        open
      </button>
    </main>
  );
};

export default TestModal;

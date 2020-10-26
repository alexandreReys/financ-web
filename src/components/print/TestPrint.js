import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DeliveryTicket from "./DeliveryTicket";

const TestPrint = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <button onClick={handlePrint}>Print</button>
      <br />
      <DeliveryTicket ref={componentRef} />
    </div>
  );
};

export default TestPrint;

import React from "react";

function LabelComponent({ children, htmlFor, labelColor }) {
  return (
    <>
      <label htmlFor={htmlFor} style={{ color: labelColor && "red" }}>
        {children}
      </label>
    </>
  );
}

export default LabelComponent;

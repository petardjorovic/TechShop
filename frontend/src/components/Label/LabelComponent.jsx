import React from "react";

function LabelComponent({ children, htmlFor, color }) {
  return (
    <>
      <label htmlFor={htmlFor} style={{ color: color && "red" }}>
        {children}
      </label>
    </>
  );
}

export default LabelComponent;

import React from "react";

function ButtonComponent({ children, className }) {
  return (
    <>
      <button className={className}>{children}</button>
    </>
  );
}

export default ButtonComponent;

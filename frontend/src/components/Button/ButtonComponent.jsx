import React from "react";

function ButtonComponent({ children, className, onClick, type }) {
  return (
    <>
      <button className={className} onClick={onClick} type={type}>
        {children}
      </button>
    </>
  );
}

export default ButtonComponent;

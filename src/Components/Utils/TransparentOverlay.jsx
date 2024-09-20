import React from "react";

const TransparentOverlay = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 1, // Ensures it's below other components
      }}
    />
  );
};

export default TransparentOverlay;

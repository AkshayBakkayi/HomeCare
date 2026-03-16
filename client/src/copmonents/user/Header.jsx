import React from "react";
import UserNavbar from "./UserNavbar";

const Header = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      <UserNavbar />
    </div>
  );
};

export default Header;
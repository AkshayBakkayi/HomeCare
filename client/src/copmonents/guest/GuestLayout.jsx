import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const GuestLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}
    >
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Body */}
      <main
        style={{
          flex: 1,
          marginTop: "80px",
          padding: "20px"
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLayout;
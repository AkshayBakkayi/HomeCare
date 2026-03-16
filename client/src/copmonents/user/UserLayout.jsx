import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

const UserLayout = () => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);

        if (user?.role === "user") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        console.error("Invalid user data");
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) return <div>Loading...</div>;

  if (authorized === false) return <Navigate to="/login" replace />;

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

      {/* Scrollable Page Content */}
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

export default UserLayout;
import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => {
   const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'admin') {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (e) {
        console.error("Invalid user data in localStorage");
        setAuthorized(false);
      }
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "30px" }}>
        <Outlet />
      </div>

      <AdminFooter />
    </>
  );
};

export default AdminLayout;
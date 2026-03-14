import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import Header from './Header';
import Footer from './Footer';

const UserLayout = () => {
    const [authorized, setAuthorized] = useState(null); // null = loading, false = not allowed, true = allowed

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        if (user?.role === 'user') {
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
    // Optional: loading state
    return <div>Loading...</div>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }
    return (
        <div
            className="user-layout"
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    marginTop: '10px' // keep this if header is fixed
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

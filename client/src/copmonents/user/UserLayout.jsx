import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const UserLayout = () => {
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

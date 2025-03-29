import React from "react";
import { Link } from "react-router-dom";
import "../authpage.css";

const AuthPage = () => {
    return (
        <div className="auth-page-container">
            <h1 className="welcome-title">Welcome to Santaan Bot</h1>
            <div className="buttons-container">
                <Link to="/login" className="auth-button">Login</Link>
                <Link to="/signup" className="auth-button">Signup</Link>
            </div>
        </div>
    );
};

export default AuthPage;
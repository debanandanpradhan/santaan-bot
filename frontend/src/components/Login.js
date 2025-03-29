import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to handle error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error before new attempt
        try {
            await login(email, password);
            navigate("/chat");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email or password. Please try again."); // Set error message
        }
    };

    return (
        <>
            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>
            
            <div className="page-wrapper">
                <div className="login-container">
                    <div className="bot-icon">
                        <div className="bot-face">
                            <div className="bot-eye left"></div>
                            <div className="bot-eye right"></div>
                            <div className="bot-mouth"></div>
                        </div>
                    </div>
                    
                    <h2>Login to <span className="santaan-bot">Santaan Bot</span></h2>
                    
                    <form onSubmit={handleLogin}>
                        <input 
                            className="input-field" 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            className="input-field" 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button className="login-button" type="submit">LOGIN</button>
                    </form>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="signup-link">
                        New to Santaan Bot? <a href="#" onClick={(e) => {e.preventDefault(); navigate("/signup")}}>Sign up</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
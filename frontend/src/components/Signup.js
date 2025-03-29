// frontend/src/pages/SignupPage.js
import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../signup.css"

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signup(email, password);
            navigate("/login");
        } catch (error) {
            setError(error.message);
            console.error("Signup failed:", error);
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
                    
                    <h2>Join <span className="santaan-bot">Santaan Bot</span></h2>
                    
                    <form onSubmit={handleSignup}>
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
                        <button className="login-button" type="submit">SIGN UP</button>
                    </form>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="signup-link">
                        Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); navigate("/login")}}>Login</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
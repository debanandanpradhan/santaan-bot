import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/Chatpage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Sidebar from "./components/Sidebar"; // Importing the Sidebar

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Main route with sidebar and chat page layout */}
                    <Route
                        path="/chat"
                        element={
                            <div className="chat-layout">
                                <Sidebar /> {/* Sidebar on the left */}
                                <div className="chat-content">
                                    <ChatPage /> {/* Main queries/chat area */}
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

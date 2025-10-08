// client/src/App.jsx (Enhanced)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, time } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import CursorEffect from "./components/CursorEffect";
// import LoadingScreen from "./components/LoadingScreen";
import "./App.css";
import "./styles/HomeCard.css";

function App() {
  return (
    <>
      {/* <AuthProvider>
        <Router>
          <div className="App">
            <CursorEffect /> */}
            {/* <LoadingScreen /> */}
            {/* <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </AuthProvider> */}
      <Home />
    </>
  );
}

export default App;

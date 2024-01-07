import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import MovieDetail from "./Components/Moviedetail/Moviedetail";
import SeatBooking from "./Components/SeatBooking/SeatBooking";
import ForgotPassword from "./Components/Forgotpassword/Forgotpassword";
import Ticket from "./Components/Ticket/Ticket";
import UserProfile from "./Components/UserProfile/UserProfile";
import Movieform from "./Components/Movieform/Movieform";
import Adminmoviepage from "./Components/Adminmoviepage/Adminmoviepage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const response = await fetch(`http://127.0.0.1:8000/project/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("isAdmin");
          setIsAuthenticated(false);
          setIsAdmin(false);
          window.location.href = "/login";
        } else {
          console.error("Logout failed");
        }
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const handleLogin = (isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  // Protected route for admin
  const AdminRoute = ({ element }) => {
    return isAdmin ? element : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/movies/:id/" element={<MovieDetail />} />
          <Route path="/movie/:id/seats/" element={<SeatBooking />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/ticket/:id/" element={<Ticket />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/movieform" element={<Movieform />} />
          <Route
            path="/adminmoviepage"
            element={<AdminRoute element={<Adminmoviepage />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

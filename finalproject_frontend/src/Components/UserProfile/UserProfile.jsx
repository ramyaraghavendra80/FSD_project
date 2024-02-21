import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const userId = localStorage.getItem("user_id"); // Retrieve user ID from localStorage
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure the user is authenticated
    if (userId && accessToken) {
      // Fetch user profile data
      fetch(`http://127.0.0.1:8000/project/users/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
  
      // Fetch booking history
      fetch(`http://127.0.0.1:8000/project/tickets/?user=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch booking history");
          }
          return response.json();
        })
        .then((historyData) => {
          setBookingHistory(historyData);
        })
        .catch((error) => {
          console.error("Error fetching booking history:", error);
        });
    } else {
      // Handle the case where the user is not authenticated or data is missing in localStorage
      setIsLoading(false);
    }
  }, [userId, accessToken]);
  
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBookingHistoryClick = () => {
    navigate(`/user/${userId}/bookings`);
  };

  const handleSaveClick = () => {
    // Create an object with the data to be updated
    const updatedUserData = {
      name: userData.name,
      username: userData.username, // Keep the same username
      email: userData.email,
      password: userData.password,
      // Add any other fields that need to be updated
    };

    // Replace this URL with your actual API endpoint for updating user data
    fetch(`http://127.0.0.1:8000/project/users/${userId}/`, {
      method: "PUT", // Use the appropriate HTTP method (PUT, PATCH, etc.) for updating data
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
        return response.json();
      })
      .then((updatedData) => {
        // Update the 'userData' state with the new data received from the API
        setUserData(updatedData);
        setIsEditing(false); // Set 'isEditing' to 'false' after a successful update
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  };

  const handleDeleteClick = () => {
    // Replace this URL with your actual API endpoint for deleting the user's profile
    fetch(`http://127.0.0.1:8000/project/users/${userId}/`, {
      method: "DELETE", // Use the appropriate HTTP method (DELETE) for deletion
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user profile");
        }
        return response.json();
      })
      .then(() => {
        // Handle successful deletion, e.g., redirect to the login page
        window.location.href = "/login"; // Replace with the actual login page URL
      })
      .catch((error) => {
        console.error("Error deleting user profile:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  };

  return (
    <div className="user-profile">
      {isLoading ? (
        <p>Loding user profile...</p>
      ) : userData ? (
        <>
          {isEditing ? (
            <>
              <h2 className="edit">Edit Profile</h2>
              <hr/>
              <label className="labelname">
                <strong>Username</strong>{" "}
                <input
                  className="inputname"
                  type="text"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </label>
              <label className="labelname">
                <strong>Email Id</strong>{" "}
                <input
                  className="inputname"
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </label>
              <button onClick={handleSaveClick}>Save</button>
            </>
          ) : (
            <>
              <h2>{userData.username}'s Profile</h2>
              <hr/>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <button className="buttonname" onClick={handleEditClick}>
                Edit Profile
              </button>
              <button className="buttonname" onClick={handleDeleteClick}>
                Delete Profile
              </button>
              <button className="buttonname" onClick={handleBookingHistoryClick}>Booking History</button>
            </>
          )}
        </>
      ) : (
        <p>Failed to load user profile.</p>
      )}
    </div>
  );
}

export default UserProfile;

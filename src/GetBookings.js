import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/getbookings.css";

const GetBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch bookings on load
  useEffect(() => {
    axios
      .get("http://localhost:4000/bookings")
      .then((response) => {
        // show only current user's bookings
        const userBookings = response.data.filter(
          (booking) => booking.user?.email === loggedUser.email
        );
        setBookings(userBookings);
      })
      .catch(() => {
        setMessage("Failed to load bookings");
      });
  }, [loggedUser.email]);

  // ✅ Cancel Booking
  const cancelBooking = (bookingId) => {
    axios
      .delete(`http://localhost:4000/bookings/${bookingId}`)
      .then(() => {
        setMessage("Booking cancelled successfully");

        setBookings(
          bookings.filter((booking) => booking.id !== bookingId)
        );
      })
      .catch(() => {
        setMessage("Failed to cancel booking");
      });
  };

  return (
    <>
      <div className="bookings-container">
        <h2 style = {{color : "white"}}>Your Bookings</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}

        {bookings.length === 0 && <p>No bookings found</p>}

        <div className="booking-card-container">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <p><strong>Hotel ID:</strong> {booking.hotelId}</p>
              <p><strong>Start Date:</strong> {booking.startDate}</p>
              <p><strong>End Date:</strong> {booking.endDate}</p>
              <p><strong>Persons:</strong> {booking.noOfPersons}</p>
              <p><strong>Rooms:</strong> {booking.noOfRooms}</p>
              <p><strong>Room Type:</strong> {booking.typeOfRoom}</p>

              <div className="booking-button-group">
                <button style={{ color: "#ffffff", background: "#667eea", fontWeight: "bold" }}
                  onClick={() =>
                    navigate(`/reschedule/${booking.id}`)
                  }
                >
                  Reschedule
                </button>

                <button style={{ color: "#ffffff", background: "#667eea", fontWeight: "bold" }}

                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



export default GetBookings;

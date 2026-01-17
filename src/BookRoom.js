import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./css/bookroom.css";

const BookRoom = () => {
  const { id } = useParams(); // hotel id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Get today's date (yyyy-mm-dd)
  const today = new Date().toISOString().split("T")[0];

  // ✅ Validation
  const validate = () => {
    let err = {};

    if (!formData.startDate || formData.startDate <= today) {
      err.startDate = "Start date must be greater than today";
    }

    if (
      !formData.endDate ||
      formData.endDate < formData.startDate
    ) {
      err.endDate = "End date must be greater than or equal to start date";
    }

    if (
      !formData.noOfPersons ||
      formData.noOfPersons <= 0 ||
      formData.noOfPersons > 5
    ) {
      err.noOfPersons = "Number of persons must be between 1 and 5";
    }

    if (
      !formData.noOfRooms ||
      formData.noOfRooms <= 0 ||
      formData.noOfRooms > 3
    ) {
      err.noOfRooms = "Number of rooms must be between 1 and 3";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Book Room
  const handleBooking = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const bookingDetails = {
      hotelId: id,
      ...formData,
      user: JSON.parse(localStorage.getItem("user")),
    };

    axios
      .post("http://localhost:4000/bookings", bookingDetails)
      .then(() => {
        setMessage("Room booked successfully!");
        setErrors({});

        setTimeout(() => {
          navigate("/bookings");
        }, 1500);
      })
      .catch(() => {
        setErrors({ api: "Booking failed. Please try again." });
      });
  };

  return (
    <>

      <div className="bookroom-container">
        <h2>Book A Room</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

        <form onSubmit={handleBooking} style={styles.form}>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              min={today}
              onChange={handleChange}
            />
            {errors.startDate && <span>{errors.startDate}</span>}
          </label>

          <label>
            End Date:
            <input
              type="date"
              name="endDate"
              min={formData.startDate || today}
              onChange={handleChange}
            />
            {errors.endDate && <span>{errors.endDate}</span>}
          </label>

          <label>
            No. of Persons:
            <input
              type="number"
              name="noOfPersons"
              onChange={handleChange}
            />
            {errors.noOfPersons && <span>{errors.noOfPersons}</span>}
          </label>

          <label>
            No. of Rooms:
            <input
              type="number"
              name="noOfRooms"
              onChange={handleChange}
            />
            {errors.noOfRooms && <span>{errors.noOfRooms}</span>}
          </label>

          <label>
            Type of Room:
            <select name="typeOfRoom" onChange={handleChange}>
              <option value="">Select</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </label>

          <button type="submit">Book</button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  form: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default BookRoom;

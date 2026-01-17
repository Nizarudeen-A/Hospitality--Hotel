import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./css/reschedulebookings.css";

const RescheduleBookings = () => {
  const {bookingId} = useParams(); // bookingId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // today date (yyyy-mm-dd)
  const today = new Date().toISOString().split("T")[0];

  // ✅ Fetch existing booking details
  useEffect(() => {
    axios
      .get(`http://localhost:4000/bookings/${bookingId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch(() => {
        setMessage("Failed to load booking details");
      });

  }, [bookingId]);

  // ✅ Validation
  const validate = () => {
    let err = {};

    if (!formData.startDate || formData.startDate <= today) {
      err.startDate = "Start date must be greater than today";
    }

    if (!formData.endDate || formData.endDate < formData.startDate) {
      err.endDate =
        "End date must be greater than or equal to start date";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Reschedule Booking
  const handleReschedule = (e) => {
    e.preventDefault();

    if (!validate()) return;

    axios
      .put(`http://localhost:4000/bookings/${bookingId}`, {
        ...formData,
      })
      .then(() => {
        setMessage("Booking rescheduled successfully!");
        setErrors({});

        setTimeout(() => {
          navigate("/bookings");
        }, 1500);
      })
      .catch(() => {
        setMessage("Failed to reschedule booking");
      });
  };

  return (
    <>
      <div className="reschedule-container">
        <h2>Reschedule Booking</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}

        <form className="reschedule-form" onSubmit={handleReschedule} >
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              min={today}
              value={formData.startDate}
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
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <span>{errors.endDate}</span>}
          </label>

          <button type="submit">Reschedule</button>
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
    gap: "12px",
  },
};

export default RescheduleBookings;

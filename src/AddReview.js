import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const {hotelId} = useParams(); // hotelId
  const navigate = useNavigate();

  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Validation
  const validate = () => {
    if (!review.trim()) {
      setError("Review is required");
      return false;
    }
    setError("");
    return true;
  };

  // ✅ Add Review
  const handleAddReview = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const reviewData = {
      reviews: [
        {
          comment: review,
          user: JSON.parse(localStorage.getItem("user"))?.email,
          date: new Date().toLocaleDateString(),
        },
      ],
    };

    axios
      .patch(`http://localhost:5000/hotels/${hotelId}`, reviewData)
      .then(() => {
        setMessage("Review added successfully!");

        setTimeout(() => {
          navigate("/hotels");
        }, 1500);
      })
      .catch(() => {
        setError("Failed to add review");
      });
  };

  return (
    <>

      <div style={styles.container}>
        <h2>Add Review</h2>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleAddReview} style={styles.form}>
          <textarea
            rows="5"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button type="submit">Add Review</button>
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

export default AddReview;

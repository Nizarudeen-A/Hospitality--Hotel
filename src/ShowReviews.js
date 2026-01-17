import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/showreviews.css";

const ShowReviews = () => {
  const { hotelId } = useParams(); // hotelId

  const [hotelName, setHotelName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch reviews on load
  useEffect(() => {
    axios
      .get(`http://localhost:5000/hotels/${hotelId}`)
      .then((response) => {
        setHotelName(response.data.name);
        setReviews(response.data.reviews || []);
      })
      .catch(() => {
        setMessage("Failed to load reviews");
      });
  }, [hotelId]);

  return (
    <>
      <div className="reviews-container">
        <h2>Reviews for {hotelName}</h2>

        {message && <p style={{ color: "red" }}>{message}</p>}

        {reviews.length === 0 ? (
          <p>No reviews available for this hotel.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="comment" >"{review.comment}"</p>
              <p>
                <strong>By:</strong> {review.user}
              </p>
              <p>
                <strong>Date:</strong> {review.date}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#f9f9f9",
  },
};

export default ShowReviews;

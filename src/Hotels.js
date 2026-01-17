import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/hotels.css";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch hotels on page load
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch(() => {
        console.error("Error fetching hotels");
      });
  }, []);

  return (
    <>
      <div className="hotels-container">
        <h2 style ={{ color: "white" }}>Available Hotels</h2>

        <div className="hotel-card-container">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h3>{hotel.name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Price:</strong> ₹{hotel.price}/night</p>
              <p><strong>Rating:</strong> ⭐ {hotel.rating}</p>
              <p>{hotel.description}</p>

              <div className="button-group">
                <button onClick={() => navigate(`/book/${hotel.id}`)}>
                  Book a Room
                </button>

                <button onClick={() => navigate(`/add-review/${hotel.id}`)}>
                  Add Review
                </button>

                <button onClick={() => navigate(`/reviews/${hotel.id}`)}>
                  View Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Hotels;

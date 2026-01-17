import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

// Pages
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Hotels from "./Hotels";
import BookRoom from "./BookRoom";
import GetBookings from "./GetBookings";
import RescheduleBookings from "./RescheduleBookings";
import AddReview from "./AddReview";
import ShowReviews from "./ShowReviews";
import NotFound from "./NotFound"

//css
import "./css/register.css";
import "./css/login.css";
import "./css/home.css";
import "./css/hotels.css";
import "./css/bookroom.css";
import "./css/getbookings.css";
import "./css/navbar.css";
import "./css/notfound.css";
import "./css/reschedulebookings.css";
import "./css/showreviews.css";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/hotels"
          element={isLoggedIn ? <Hotels /> : <Navigate to="/login" />}
        />
        <Route
          path="/book/:hotelId"
          element={isLoggedIn ? <BookRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/bookings"
          element={isLoggedIn ? <GetBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="/reschedule/:bookingId"
          element={isLoggedIn ? <RescheduleBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-review/:hotelId"
          element={isLoggedIn ? <AddReview /> : <Navigate to="/login" />}
        />
        <Route
          path="/reviews/:hotelId"
          element={isLoggedIn ? <ShowReviews /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={isLoggedIn ? <NotFound /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}


export default App;

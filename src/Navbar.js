import { Link, useNavigate } from "react-router-dom";
import "./css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) return null;

  // if login is true, then return the Navbar html
  // otherwise ,return the NULL.
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3 className="logo">Bonstay</h3>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/hotels">Hotels</Link>
        <Link to="/bookings">Bookings</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};


export default Navbar;

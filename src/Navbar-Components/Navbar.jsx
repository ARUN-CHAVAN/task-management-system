import { FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ userEmail, logout, isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">Task Manager</span>

        {isLoggedIn ? (
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">Logged in: {userEmail}</span>

            <button className="btn btn-danger" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-success me-2"
              onClick={() => navigate("/login")}
            >
              <FaSignInAlt /> Login
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              <FaUserPlus /> Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
import { FaSignOutAlt } from "react-icons/fa";

function Navbar({ userEmail, logout }) {
  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">Task Manager</span>
        <span className="text-white">Logged in: {userEmail}</span>

        <button className="btn btn-danger" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
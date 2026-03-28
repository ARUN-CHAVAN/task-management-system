import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        setError("Email and Password required");
        return;
      }
      const res = await axios.post("https://task-backend-production-9d85.up.railway.app/auth/login", {
        email,
        password,
      });
      //save token
      if (
        !res.data ||
        typeof res.data !== "string" ||
        res.data.split(".").length !== 3
      ) {
        setError("Invalid email or password ");
        return;
      }
      localStorage.setItem("token", res.data);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <div className="mb-3">
          <label className="form-label text-start d-block">Email</label>
          <input
            type="email"
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-start d-block">Password</label>
          <input
            type="password"
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <a href="/register" className="text-decoration-none">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

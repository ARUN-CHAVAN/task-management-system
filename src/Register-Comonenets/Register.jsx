import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const registerUser = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("https://task-backend-production-9d85.up.railway.app/auth/register", {
        name,
        email,
        password,
        role: "USER",
      });

      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);

      setErrors({ api: "Registration failed. Try again." });
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Create Account</h3>

    
      <div className="mb-3">
        <label className="form-label text-start d-block">Name</label>
        <input
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name}</div>
        )}
      </div>

  
      <div className="mb-3">
        <label className="form-label text-start d-block">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

    
      <div className="mb-3">
        <label className="form-label text-start d-block">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>

    
      {errors.api && (
        <div className="alert alert-danger py-2">{errors.api}</div>
      )}

      
      <button className="btn btn-success w-100" onClick={registerUser}>
        Register
      </button>

    
      <p className="text-center mt-3 mb-0">
        Already have an account?{" "}
        <a href="/" className="text-decoration-none">
          Login
        </a>
      </p>
    </div>
  </div>
);
}

export default Register;

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
      await axios.post("http://localhost:8081/auth/register", {
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
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2>Register</h2>
        <input
          className="form-control mb-1"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
        <input
          className="form-control mb-1"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}

        <input
          type="password"
          className="form-control mb-1"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}

        {errors.api && <div className="text-danger mt-2">{errors.api}</div>}

        <button className="btn btn-success mt-3" onClick={registerUser}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;

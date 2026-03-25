import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
const handleLogin = async () => {
  try {
    if (!email.trim() || !password.trim()) {
      setError("Email and Password required");
      return;
    }
    const res = await axios.post("http://localhost:8081/auth/login", {
      email,
      password,
    });
    //save token
if(!res.data || typeof res.data !=="string" || res.data.split(".").length !==3){
  setError("Invalid email or password ");
  return;
}
    localStorage.setItem("token",res.data);
    window.location.href="/dashboard";

  } catch (err) {
    alert("Invalid email or password"); 
  }
};
 
  return (
    <div className="card p-4 shadow">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>{ setEmail(e.target.value);
        setError("");
        }}
      /><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {setPassword(e.target.value);
          setError("");
        }}
      /><br/>
      {
        error && (
          <div className="alert alert-danger mt-2 p-2">{error}</div>
        )
      }

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
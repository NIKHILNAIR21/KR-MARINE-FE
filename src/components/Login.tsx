import { useState } from "react";
import { Input } from "./ui/input";
import { login } from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import { setSession } from "../../session";

const Login = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await login({ name, password });
      console.log("Login successful:", response?.data?.token);
      // Set token using setToken helper

      if (response?.data?.token) {
        setSession(response?.data?.token);
        navigate("/dashboard"); // Save token (in cookies or local storage)
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-10 bg-sky-500/30 w-80 backdrop:opacity-10 backdrop-blur-md rounded-lg">
      <div>
        <h1 className="text-3xl font-semibold text-center">KN Marine</h1>
        <p className="text-xl font-semibold text-center">The manning company</p>
      </div>

      <Input
        className="my-5 bg-white"
        type="text"
        placeholder="Enter Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        className="my-5 bg-white"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        className="bg-blue-600 text-white p-2.5 rounded-lg mx-auto w-32 text-lg"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;

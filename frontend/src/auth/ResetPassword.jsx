import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

function ResetPassword() {
  //   const { token } = useParams();
  const token = "$2b$12$ik.bTjWwXtHJZencvLlA4.P4RF9d3z9urZDrUat3KcyhZgUMZpPLS";
  const navigate = useNavigate();

  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (data.password != data.confirmPassword) {
      setError("Password does not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post(
        "/resetPassword",
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(res.data.message);

      // Redirect after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          name="password"
          type="password"
          placeholder="Enter new password"
          value={data.password}
          onChange={handleInputChange}
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={data.confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <p onClick={() => navigate("/login")}>Login</p>
    </div>
  );
}

export default ResetPassword;

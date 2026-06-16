import { useState } from "react";
import { api } from "../api/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/forgotPassword", { email });

      setMessage(res.data.message);
    } catch {
      setMessage("Something went wrong, Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;

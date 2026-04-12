import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    
    // setUserData((prev_Value) => ({
    //   ...prev_Value,
    //   [e.target.name]: e.target.value,
    // }));
    // console.log(userData);
    
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/register", userData);

      setSuccess(response.data.message);
      console.log(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong, please try again",
      );
      console.error(error);
    } finally {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };


useEffect(() => {

}, [userData])
  return (
    <div>
      <input
        placeholder="username"
        value={userData.username}
        onChange={handleInputChange}
      />
      <input
        placeholder="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        placeholder="password"
        value={userData.password}
        onChange={handleInputChange}
      />

      <button onClick={() => handleRegister()}>Register</button>
    </div>
  );
}

export default Register;

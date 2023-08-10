import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    setIsFormFilled(data.email !== "" && data.password !== "");
  }, [data]);

  const loginUser = async function (e) {
    e.preventDefault();
    const newData = await axios.post("/login", data);
    console.log(newData.data);
    if (newData.data.error || newData.error) {
      toast.error(newData.data.error);
    } else {
      toast.success("Login is successful");
      setData({});
      window.location.replace("/dashboard");
    }
  };

  const onInputChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div className="login">
      <h1>Sign in Your Account</h1>
      <form onSubmit={loginUser}>
        <div className={`input-container ${data.email ? "input-filled" : ""}`}>
          <label htmlFor="email" className={data.email ? "label-moved" : ""}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onInputChange("email", e.target.value)}
          />
        </div>
        <div
          className={`input-container ${data.password ? "input-filled" : ""}`}
        >
          <label
            htmlFor="password"
            className={data.password ? "label-moved" : ""}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onInputChange("password", e.target.value)}
          />
        </div>
        <button
          id="submit"
          type="submit"
          className={`submit ${isFormFilled ? "submit-filled" : ""}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

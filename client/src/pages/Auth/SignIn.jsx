import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const validateEmail = (e) => {
    const input = e.target;
    input.setCustomValidity("");
    setEmail(input.value); // Update state on change

    if (!input.validity.valid) {
      return; // Basic HTML5 validation fails (e.g., empty, invalid format)
    }

    if (!input.value.endsWith("@gmail.com")) {
      input.setCustomValidity(
        "Please enter an email address ending with @gmail.com"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (response.status === 200) {
        navigate("/");
      }else{
        setMessage(json.message)
      }

      // Navigate to another route after successful login
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-3">Sign in</h2>
        <p className="mb-8 text-center">
          Haven't got an account yet?{" "}
          <Link to={"/signup"} className="hover:text-blue-400 hover:underline">
            Sign up here!
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              value={email}
              onChange={validateEmail}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md p-2"
            />
            <small className="text-gray-500">Between 8-24 characters</small>
          </div>

          <div className="flex flex-col justify-between gap-x-3 mb-7">
            <p className="font-semibold">Role</p>
            <select className="p-2 border-2 border-gray-300 rounded-md w-full">
              <option>Instructor</option>
              <option>Student</option>
            </select>
          </div>
          
          {/* Sign-in Button */}
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign in
          </button>

          <div className="text-red-600 italic">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

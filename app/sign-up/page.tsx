"use client";
// components/SignupForm.js
import { useAuth } from "@common/auth/AuthProvider";
import ToastComponent from "@common/utils/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import userbase from "userbase-js";
import "../globals.css";

interface User {
  username: string;
  // ... other user properties ...
}

export default function SignupForm() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const userResponse = await userbase.signUp({
        username,
        password,
        rememberMe: "session",
      });
      const userInfo = {
        username: username,
        isLoggedIn: true,
      };
      <ToastComponent message="Sign up... success!" status="success" />;
      login(userInfo);
      console.log("Signed up: " + user);
      router.push("/");
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <form
          className="bg-white rounded px-8 pt-6 pb-8 mb-24 font-mono"
          onSubmit={handleSignup}
        >
          <label
            className="block text-center text-gray-700 font-bold mb-2 text-xl"
            htmlFor="username"
          >
            Sign Up 👋
          </label>
          <div className="divider"></div>
          <div className="mb-4 text-xl">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6 text-xl">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
          <div className="flex items-center justify-end">
            <button className="btn">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

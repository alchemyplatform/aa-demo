"use client";
import { useAuth } from "@common/auth/AuthProvider";
import Hero from "@common/hero/Hero";
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  const { user, login } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // If you want to get a specific parameter by its key
    const signupParam = urlParams.get("signup");
    const loginParam = urlParams.get("login");

    if (signupParam == "success") {
      setToastMessage(`Success! Welcome, ${user?.username}!`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000); // Hide after 4 seconds
    }

    if (loginParam == "success") {
      setToastMessage(`Welcome back, ${user?.username}!`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000); // Hide after 4 seconds
    }
  }, []);

  return (
    <div className="font-mono">
      <div>
        <Hero showToast={showToast} message={toastMessage} />
      </div>
    </div>
  );
}

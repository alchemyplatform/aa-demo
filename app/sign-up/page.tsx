"use client";
import { useAuth } from "@common/auth/AuthProvider";
import Loader from "@common/utils/Loader";
import * as secp from "@noble/secp256k1";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userbase from "userbase-js";
import "../globals.css";

export default function SignupForm() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push("/");
    }
  }, []);

  const handleSignup = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const privKey = secp.utils.randomPrivateKey();
      const privKeyHex = secp.etc.bytesToHex(privKey);

      const response = await userbase.signUp({
        username,
        password,
        rememberMe: "local",
        email: "client@nyu.edu",
        profile: {
          hello: "some random data about this user...",
          pk: privKeyHex,
        },
      });

      // 1. algorithm that computes pk deterministically
      // pk never leaves user's computer, stored in browser
      // drawback:

      // safer than the db ->

      

      // 2. use a browser feature that lets you sign
      
      // they have a password that they can't change but pk is generated from pw
      // check hash of code to make sure no tampering

      //

      console.log("IN SIGN UPPPPP");

      // instead of the actual pk
      // hash it, encrypt it
      // if user is logged in, decode it

      // hash it with SHA3 - no one would be able to decode it
      //

      const userInfo = {
        username: username,
        isLoggedIn: true,
        userId: response.userId,
      };

      login(userInfo);
      router.push("/?signup=success");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

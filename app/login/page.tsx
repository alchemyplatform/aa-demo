"use client";
// components/LoginForm.tsx
import { useAuth } from "@common/auth/AuthProvider";
import Loader from "@common/utils/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userbase from "userbase-js";
import "../globals.css";

export default function LoginForm() {
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

  const handleLogin = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await userbase.signIn({
        username,
        password,
        rememberMe: "local",
      });

      console.log("In the login form rn");
      console.log(response);
      const userInfo = {
        username: username,
        isLoggedIn: true,
        userId: response.userId,
        userScwAddress: response.profile?.scwAddress,
      };
      login(userInfo);
      const data = {
        userId: response.userId,
      };
      const response2 = await fetch("/api/admin/get-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("some data");
      console.log(await response2.json());

      // 1. deploy a simple NFT contract
      // 2. mint an NFT from that contract to user's SCW

      // we want to send a UserOp which mints the NFT to user's SCW

      // deploySCW();
      // CREATE 2 deterministic addres gen?

      router.push("/?login=success");
      console.log(`Userbase login succesful. ✅ Welcome, ${username}!`);
    } catch (error: any) {
      console.log("does this get hi???");
      setIsLoading(false);
      setError(error.message || "An unexpected error occurred."); // Update the error state
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
              onSubmit={handleLogin}
            >
              <label
                className="block text-center text-gray-700 font-bold mb-2 text-xl"
                htmlFor="username"
              >
                Login 🧙‍♂️
              </label>
              <div className="divider"></div>
              <div className="mb-4 text-xl ">
                <label
                  className="block text-gray-700 mb-2 font-bold"
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
                  value={username}
                />
              </div>
              <div className="mb-6 text-xl ">
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
                  value={password}
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
              <div className="flex items-center justify-between">
                {/* <button
                  onClick={() => router.push("/sign-up")}
                  className="btn bg-[#445dea] text-white"
                >
                  Sign Up
                </button> */}
                <div
                  className="link link-secondary cursor-pointer"
                  onClick={() => router.push("/sign-up")}
                >
                  No account yet?
                </div>
                <button onClick={handleLogin} className="btn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

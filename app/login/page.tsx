"use client";
import { useAuth } from "@common/auth/AuthProvider";
import Banner from "@common/utils/Banner";
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
  const [bannerVisible, setBannerVisible] = useState(true);

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
      const userInfo = {
        username: username,
        isLoggedIn: true,
        userId: response.userId,
        userScwAddress: response.profile?.scwAddress,
      };
      login(userInfo);
      router.push("/?login=success");
      console.log(`Userbase login succesful. ✅ Welcome, ${username}!`);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || "An unexpected error occurred."); // Update the error state
      console.error(error);
    }
  };

  const handleDismiss = () => {
    setBannerVisible(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-mono">
          {bannerVisible && <Banner onDismiss={handleDismiss} />}
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

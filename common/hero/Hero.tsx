import { useAuth } from "@common/auth/AuthProvider";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="hero min-h-screen bg-base-200 mt-[-48px]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          {user?.isLoggedIn ? (
            <h1 className="text-5xl font-bold">
              Hello there, {user?.username}! 🤗
            </h1>
          ) : (
            <div className="text-5xl font-bold">
              Welcome to the AA demo dapp!
            </div>
          )}

          <p className="mt-2 py-6">This application uses:</p>
          <ul>
            <li>Userbase</li>
            <li>Tailwind CSS</li>
            <li>DaisyUI</li>
            <li>Typescript</li>
          </ul>
          {user?.isLoggedIn ? (
            ""
          ) : (
            <div className="mt-10 flex flex-col justify-between gap-4">
              <button
                onClick={() => router.push("/sign-up")}
                className="btn bg-[#445dea] text-white"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="btn bg-[#6ed09f] text-white"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

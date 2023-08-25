import { useAuth } from "@common/auth/AuthProvider";
import Toast from "@common/utils/Toast";
import { useRouter } from "next/navigation";

export default function Hero({ showToast, toastMessage }: any) {
  const { user } = useAuth();
  const router = useRouter();

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const randomColor = getRandomColor();

  return (
    <div className="hero bg-base-200 min-h-screen text-center">
      <div className="hero-content flex flex-col">
        <div className="max-w-md">
          {user?.isLoggedIn ? (
            <>
              <span className="flex text-5xl font-bold">
                <span>
                  Hello there,&nbsp;{" "}
                  <span style={{ color: randomColor }}>{user?.username}</span>!
                  🤗
                </span>
              </span>
            </>
          ) : (
            <div>
              <div className="text-5xl font-bold">
                Welcome to the AA demo dapp!
              </div>
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
            </div>
          )}

          <p className="mt-2 py-6">This application uses:</p>
          <ul>
            <li>Userbase</li>
            <li>Tailwind CSS</li>
            <li>DaisyUI</li>
            <li>Typescript</li>
          </ul>
        </div>
        {showToast && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}
function startWindToast(
  arg0: string,
  arg1: string,
  arg2: string,
  arg3: number,
  arg4: string
) {
  throw new Error("Function not implemented.");
}

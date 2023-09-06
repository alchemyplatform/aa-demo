import { useAuth } from "@common/auth/AuthProvider";
import Toast from "@common/utils/Toast";
import aaDiagram from "@public/assets/sponsored-tx-flow.jpeg";
import Image from "next/image";
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
    <div className="bg-base-200">
      <div className="p-20 pb-6 text-center">
        {user?.isLoggedIn ? (
          <div className="flex flex-col gap-6">
            <span className="text-5xl font-bold">
              <span>
                Hello there,
                <span className="ml-[-20px]" style={{ color: randomColor }}>
                  {" "}
                  {user?.username}
                </span>
                ! 🤗
              </span>
            </span>
            <span className="text-2xl font-regular">
              Your smart contract wallet address is{" "}
              <a
                className="link link-secondary"
                href={`https://sepolia.etherscan.io/address/${user?.scwAddress}`}
                target="_blank"
              >
                {user?.scwAddress}
              </a>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold">
              Account Abstraction Demo Dapp ⚡️
            </div>
            <p className="mt-5">
              This is your portal to the account abstraction dimension of
              Ethereum. 🧙‍♂️
            </p>
            <p className="mt-2">
              Experience sponsored transactions that allow you to mint, transfer
              and burn 🔥 NFTs without the user paying for gas.
            </p>
            <div className="flex flex-col">
              <div className="mt-8 mb-5 flex justify-between gap-4">
                <button
                  onClick={() => router.push("/login")}
                  className="btn bg-[#324996] text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="btn bg-[#445dea] text-white"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image src={aaDiagram} alt="diagram" />
        <p className="text-sm my-2 w-[70%] text-center">
          Executor calls both a paymaster contract and a user's smart contract
          wallet to determine if the user's transaction can be sponsored.
        </p>
        {showToast && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

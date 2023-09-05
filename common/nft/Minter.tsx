import { useAuth } from "@common/auth/AuthProvider";
import { useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Minter() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const { width, height } = useWindowSize();

  async function handleMint() {
    setIsLoading(true);
    const data = {
      userId: user?.userId,
      userScwAddress: user?.scwAddress,
      nameOfFunction: "mint",
    };
    await fetch("/api/nft-user-op/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //const messageResponse = await response.json();
    setIsLoading(false);
    setHasMinted(true);
  }
  return (
    <div className="flex items-center justify-center mt-12">
      {hasMinted ? <Confetti /> : ""}
      <div className="card lg:card-side bg-base-100 shadow-xl w-[70%]">
        <figure>
          <img
            src="https://alchemy.mypinata.cloud/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi"
            alt="sample nft"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl">Generic Bored Ape on Sepolia</h2>
          <p className="text-sm">
            You are about to mint a fake NFT purely for testing purposes. The
            NFT will be minted directly to your smart contract wallet!
          </p>
          <div className="flex items-center justify-end">
            <div
              className={`alert w-[50%] mr-4 ${
                hasMinted ? "visible" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>NFT minted. ✅</span>
            </div>
            <button className="btn btn-primary text-white" onClick={handleMint}>
              <span
                className={`${
                  isLoading ? "loading loading-spinner" : "hidden"
                }`}
              ></span>
              {isLoading ? "Minting" : hasMinted ? "Mint Again" : "Mint"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

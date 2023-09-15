"use client";
import { useAuth } from "@common/auth/AuthProvider";
import Minter from "@common/nft/Minter";
import WalletDisplay from "@common/nft/WalletDisplay";
import Loader from "@common/utils/Loader";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import "../globals.css";

export default function NftMinter() {
  const { user } = useAuth();
  const [buttonToggle, setButtonToggle] = useState(true);
  const generator = new AvatarGenerator();

  return (
    <div>
      {user?.isLoggedIn ? (
        <div className="font-mono text-2xl mt-8">
          <div className="flex items-center">
            <div className="avatar">
              <div className="rounded-full ml-12">
                <img src={generator.generateRandomAvatar(user?.userId)} />
              </div>
            </div>
            <div className="flex flex-col ml-6 gap-2">
              <div className="bg-base-300">
                <b>User:</b> {user?.username}
              </div>
              <div className="bg-base-300">
                <b>SCW :</b>{" "}
                <a
                  className="link link-secondary"
                  href={`https://sepolia.etherscan.io/address/${user?.scwAddress}`}
                  target="_blank"
                >
                  {user?.scwAddress}
                </a>
              </div>
            </div>
          </div>
          <div className="tabs items-center flex justify-center mb-[-25px]">
            <a
              className={`tab tab-lg tab-lifted text-2xl ${
                buttonToggle ? "tab-active" : ""
              }`}
              onClick={() => setButtonToggle(!buttonToggle)}
            >
              Your Wallet
            </a>
            <a
              className={`tab tab-lg tab-lifted text-2xl ${
                buttonToggle ? "" : "tab-active"
              }`}
              onClick={() => setButtonToggle(!buttonToggle)}
            >
              Mint an NFT
            </a>
          </div>
          <div className="divider mx-16 mb-8"></div>
          {buttonToggle ? <WalletDisplay /> : <Minter />}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center mt-36 mx-8 text-4xl font-mono">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}

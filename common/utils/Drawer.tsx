import { useAuth } from "@common/auth/AuthProvider";
import alchemyLogo from "@public/assets/alchemy-logo.svg";
import chevronLeft from "@public/assets/chevron-left.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import userbase from "userbase-js";

export default function Drawer() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const router = useRouter();
  const generator = new AvatarGenerator();
  const [, setError] = useState<string | null>(null);

  function handleLogout() {
    try {
      userbase
        .signOut()
        .then(() => {
          // user logged out
          console.log("User logged out!");
          logout();
          router.push("/");
        })
        .catch((e: any) => console.error(e));
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred."); // Update the error state
    }
  }

  return (
    <div className="relative font-mono">
      <div className={`${drawerOpen ? "mr-64" : "mr-0"}`}>
        <div
          className={`top-0 bottom-0 flex-none overflow-hidden transition-all ease-in-out duration-300 ${
            drawerOpen ? "w-64" : "w-0"
          } bg-[#3a4b77] fixed`}
        >
          {/* Drawer content */}
          <div
            className={`${
              drawerOpen ? "visible" : "invisible"
            } text-black flex flex-col h-full justify-between`}
          >
            <div>
              <div className="flex items-center justify-center py-2 bg-[#232939] ">
                <button
                  onClick={() => router.push("/")}
                  className="btn btn-ghost normal-case text-xl text-white"
                >
                  <Image
                    onClick={() => router.push("/")}
                    className="ml-1.5 cursor-pointer"
                    width={52}
                    height={100}
                    src={alchemyLogo}
                    alt="logo"
                  />
                </button>
              </div>
              <div className="flex flex-col">
                <div
                  onClick={() => router.push("/nft-minter")}
                  className="btn glass rounded-none text-white hover:text-black"
                >
                  Gasless NFT Minter
                </div>
                <div
                  onClick={() => router.push("/paay")}
                  className="btn glass rounded-none text-white hover:text-black"
                >
                  PAAY
                </div>
                <div
                  // onClick={() => router.push("/paay")}
                  className="btn glass rounded-none text-white hover:text-black"
                >
                  Native ETH Transfer
                </div>
              </div>
            </div>
            {drawerOpen && (
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`dropdown dropdown-top mb-3 hover:shadow-md cursor-pointer ${
                    user?.isLoggedIn ? "visible" : "hidden"
                  }`}
                >
                  <label
                    tabIndex={0}
                    className={`btn btn-circle avatar ${
                      user?.isLoggedIn ? "" : "cursor-default"
                    }`}
                  >
                    <div className="w-64 rounded-full">
                      <img src={generator.generateRandomAvatar(user?.userId)} />
                    </div>
                    <label className="text-white mt-1 cursor-pointer">
                      {user?.username}
                    </label>
                  </label>
                  <ul
                    tabIndex={0}
                    className={`z-[1] shadow menu menu-sm dropdown-content bg-[white] rounded-box ml-[-18px] mb-2 ${
                      user?.isLoggedIn ? "" : "hidden"
                    }`}
                  >
                    {user?.isLoggedIn ? (
                      <li className="text-black" onClick={handleLogout}>
                        <a>Logout</a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
                <div className="mb-4 flex self-center">
                  <Image
                    src={chevronLeft}
                    alt="icon"
                    className="mb-0.5 mr-0.5"
                  />
                  <button
                    className="transition-all ease-in-out duration-300 rounded-none h-16 font-mono text-white"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Open Sidebar Button outside the Drawer */}
      {!drawerOpen && (
        <button
          className="flex mb-2 ml-2 fixed bottom-0 left-0 z-20 transition-all ease-in-out duration-300 rounded-none"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <span>Open Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-chevron-right mt-[6px] ml-0.5"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

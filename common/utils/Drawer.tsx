import chevronLeft from "@public/assets/chevron-left.svg";
import Image from "next/image";
import { useState } from "react";

export default function Drawer() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="relative min-h-screen font-mono">
      <div
        className={`top-0 bottom-0 flex-none overflow-hidden h-full transition-all ease-in-out duration-300 ${
          drawerOpen ? "w-64 border-r border-r-[#4a5c8d]" : "w-0"
        } bg-[#3a4b77]`}
      >
        {/* Drawer content */}
        <div
          className={`${
            drawerOpen ? "visible" : "invisible"
          } text-black flex flex-col h-full justify-between`}
        >
          <div>
            <div className="flex items-center justify-center mt-2">
              <button
                // onClick={() => router.push("/")}
                className="btn btn-ghost normal-case text-xl text-white"
              >
                Alchemy Demo Dapp
              </button>
            </div>
            <div className="flex flex-col">
              <div className="mt-2 btn rounded-none">NFT Minter</div>
              <div className="btn rounded-none">PAAY</div>
            </div>
          </div>
          {drawerOpen && (
            <div className="mb-4 flex self-center">
              <Image src={chevronLeft} alt="icon" className="mb-0.5 mr-0.5" />
              <button
                className="transition-all ease-in-out duration-300 rounded-none h-16 font-mono text-white"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                Close Menu
              </button>
            </div>
          )}
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
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

import { useAuth } from "@common/auth/AuthProvider";
import Loader from "@common/utils/Loader";
import { useEffect, useState } from "react";

interface Nft {
  contract: object;
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  media: object;
}

interface Data {
  ownedNfts: Nft[];
  length: number;
}

export default function WalletDisplay() {
  const { user } = useAuth();
  const [ownedNftsArray, setOwnedNftsArray] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    fetchUserNfts();
  }, []);

  function truncateDescription(description: string, wordCount: number) {
    const words = description.split(" ");
    if (words.length > wordCount) {
      const truncatedWords = words.slice(0, wordCount);
      return `${truncatedWords.join(" ")} ...`;
    }
    return description;
  }

  async function fetchUserNfts() {
    setIsLoading(true);
    try {
      const data = { address: user?.scwAddress };
      const response = await fetch("/api/getUserNfts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const messageResponse = await response.json();
      console.log(messageResponse.data.ownedNfts);
      setOwnedNftsArray(messageResponse.data.ownedNfts);
      console.log(ownedNftsArray);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  }

  async function burnNft(event: React.MouseEvent<HTMLButtonElement>) {
    setIsBurning(true);
    const tokenId = event.currentTarget.id;
    console.log("Button ID:", tokenId);
    const data = {
      userId: user?.userId,
      userScwAddress: user?.scwAddress,
      nameOfFunction: "burn",
      tokenId: tokenId,
    };
    const response = await fetch("/api/nft-user-op/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsBurning(false);
    fetchUserNfts();
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-[-350px]">
          <Loader />
        </div>
      ) : ownedNftsArray && ownedNftsArray.length >= 1 ? (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-12 mb-6">
            {ownedNftsArray &&
              Array.isArray(ownedNftsArray) &&
              ownedNftsArray.map((nft, index) => (
                <div
                  key={index}
                  className="bg-base-100 rounded-lg shadow-xl max-w-[250px] max-h-[600px] overflow-hidden"
                >
                  <figure>
                    <img
                      src={
                        nft.media[0].gateway
                          ? nft.media[0].gateway
                          : nft.media[0].raw
                      }
                      alt="user nft image"
                      className="w-full max-h-[300px]"
                    />
                  </figure>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{nft.title}</h2>
                    <p className="text-gray-600">
                      {truncateDescription(nft.description, 25)}
                    </p>
                    <div className="flex justify-end">
                      {nft.contract.address ==
                      "0x6ad1aa62564a58a4037b956f528015ab2187a250" ? (
                        <button
                          className="btn btn-primary text-white"
                          onClick={burnNft}
                          id={nft.tokenId}
                        >
                          <span
                            className={`${
                              isBurning ? "loading loading-spinner" : "hidden"
                            }`}
                          ></span>
                          {isBurning ? "🔥🔥 Burning 🔥🔥" : "Burn 🔥"}
                        </button>
                      ) : (
                        <button
                          id={nft.tokenId}
                          className="btn btn-primary text-white"
                        >
                          Transfer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center mx-8 mt-32">
            Your smart contract wallet does not own any NFTs yet! 🤯
            <div className="flex mt-4">
              Mint one by selecting the <b>&nbsp;Mint an NFT&nbsp;</b> tab. ⬆️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

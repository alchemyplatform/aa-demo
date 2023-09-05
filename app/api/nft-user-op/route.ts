import { SendUserOperationResult } from "@alchemy/aa-core";
import { createSigner } from "@common/aa/createSigner";
import alchemyBurnableNftAbi from "@common/utils/abi/AlchemyBurnable.json";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { userId, userScwAddress, nameOfFunction, tokenId } = body;
  // get user's pk from server
  const userResponse = await getUser(userId);
  const userResponseObject = await userResponse?.json();
  const pk = userResponseObject?.response?.profile?.pk;

  const signer = await createSigner(pk);

  const amountToSend: bigint = parseEther("0");

  let params;
  if (nameOfFunction == "mint") {
    params = userScwAddress;
  } else {
    params = tokenId;
  }

  const data = encodeFunctionData({
    abi: alchemyBurnableNftAbi,
    functionName: nameOfFunction,
    args: [params], // User's Smart Contract Wallet Address
  });

  const result: SendUserOperationResult = await signer.sendUserOperation({
    target: "0x6ad1AA62564A58A4037b956f528015aB2187A250", // burnable nft contract address
    data: data,
    value: amountToSend,
  });

  // sponsored ETH tx to Sahil's address
  // const result: SendUserOperationResult = await signer.sendUserOperation({
  //   target: "0xed6E997f5AF4456F1A1aac3DA5dEE5e904dFabE0", // nft contract address
  //   data: "0x",
  //   value: amountToSend,
  // });

  console.log("User operation result: ", result);

  console.log(
    "\nWaiting for the user operation to be included in a mined transaction..."
  );

  const txHash = await signer.waitForUserOperationTransaction(
    result.hash as `0x${string}`
  );

  console.log("\nTransaction hash: ", txHash);

  const userOpReceipt = await signer.getUserOperationReceipt(
    result.hash as `0x${string}`
  );

  console.log("\nUser operation receipt: ", userOpReceipt);

  const txReceipt = await signer.rpcClient.waitForTransactionReceipt({
    hash: txHash,
  });

  return NextResponse.json({ receipt: txReceipt });
}

async function getUser(userId: any) {
  try {
    const response = await axios.get(
      `https://v1.userbase.com/v1/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.USERBASE_ACCESS_TOKEN}`,
        },
      }
    );

    console.log(response.data); // The user data will be available here
    return NextResponse.json({ response: response.data });
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

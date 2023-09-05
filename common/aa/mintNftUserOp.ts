import alchemyAbi from "@common/utils/abi/Alchemy.json";
import simpleFactoryAbi from "@common/utils/abi/SimpleFactory.json";
import { publicClient } from "@common/utils/client";
import { encodeFunctionData, parseEther } from "viem";
import { createSigner } from "./createSigner";

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Separating the logic to create the account, and the logic to send the transaction
 */
export async function mintNftUserOp(USER_PRIV_KEY: any) {
  console.log(process.env);
  const signer = await createSigner(USER_PRIV_KEY);

  const ownerAccount = signer.account;
  const ownerAddress = (ownerAccount as any).owner.owner.address;
  const userScwAddress = await publicClient.readContract({
    address: "0x9406Cc6185a346906296840746125a0E44976454",
    abi: simpleFactoryAbi,
    functionName: "getAddress",
    args: [ownerAddress, 0],
  });

  const amountToSend: bigint = parseEther("0");

  const data = encodeFunctionData({
    abi: alchemyAbi,
    functionName: "mint",
    args: [userScwAddress], // User's SCW
  });

  // const result: SendUserOperationResult = await signer.sendUserOperation({
  //   target: "0xd1991f76C865FD19BD4C96e0F7eBf88b0d745664", // nft contract address
  //   data: data,
  //   value: amountToSend,
  // });

  // sponsored ETH tx to Sahil's address

  // const result: SendUserOperationResult = await signer.sendUserOperation({
  //   target: "0xed6E997f5AF4456F1A1aac3DA5dEE5e904dFabE0", // nft contract address
  //   data: "0x",
  //   value: amountToSend,
  // });

  // console.log("User operation result: ", result);

  // console.log(
  //   "\nWaiting for the user operation to be included in a mined transaction..."
  // );

  // const txHash = await signer.waitForUserOperationTransaction(
  //   result.hash as `0x${string}`
  // );

  // console.log("\nTransaction hash: ", txHash);

  // const userOpReceipt = await signer.getUserOperationReceipt(
  //   result.hash as `0x${string}`
  // );

  // console.log("\nUser operation receipt: ", userOpReceipt);

  // const txReceipt = await signer.rpcClient.waitForTransactionReceipt({
  //   hash: txHash,
  // });

  // return txReceipt;
}

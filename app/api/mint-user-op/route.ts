import {
  LocalAccountSigner,
  SimpleSmartAccountOwner,
  SmartAccountProvider,
} from "@alchemy/aa-core";
import { NextRequest } from "next/server";
import { sepolia } from "viem/chains";

export async function POST(request: NextRequest) {
  console.log("In route!");
  const body = await request.json();

  const { userId } = body;
  const data = {
    userId: userId,
  };
  // get user's pk from server
  const response = await fetch("../admin/get-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
  // const signer = await createSigner(USER_PRIV_KEY);

  // const ownerAddress = signer.account.owner.owner.address;
  // const userSCWAddress = await publicClient.readContract({
  //   address: "0x9406Cc6185a346906296840746125a0E44976454",
  //   abi: simpleFactoryAbi,
  //   functionName: "getAddress",
  //   args: [ownerAddress, 0],
  // });

  // const amountToSend: bigint = parseEther("0");

  // const data1 = encodeFunctionData({
  //   abi: alchemyAbi,
  //   functionName: "mint",
  //   args: [userSCWAddress], // User's SCW
  // });

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

async function createSigner(USER_PRIV_KEY: any) {
  const owner: SimpleSmartAccountOwner =
    LocalAccountSigner.privateKeyToAccountSigner(`0x${USER_PRIV_KEY}`);

  const chain = sepolia;
  const provider = new SmartAccountProvider(
    ALCHEMY_API_URL,
    ENTRYPOINT_ADDRESS,
    chain,
    undefined,
    {
      txMaxRetries: 10,
      txRetryIntervalMs: 5000,
    }
  );

  let signer = provider.connect(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient,
      })
  );

  // [OPTIONAL] Use Alchemy Gas Manager
  signer = withAlchemyGasManager(signer, {
    policyId: "51781d7c-1e0a-43b5-a755-7a2c22c3b6f8",
    entryPoint: ENTRYPOINT_ADDRESS,
  });

  return signer;
}

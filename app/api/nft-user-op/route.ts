import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import {
  LocalAccountSigner,
  SendUserOperationResult,
  SimpleSmartAccountOwner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
} from "@alchemy/aa-core";
import alchemyBurnableNftAbi from "@common/utils/abi/AlchemyBurnable.json";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { sepolia } from "viem/chains";

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
    // "burn"
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

async function createSigner(USER_PRIV_KEY: any) {
  const ALCHEMY_API_URL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_AA_API_KEY}`;
  const ENTRYPOINT_ADDRESS = process.env
    .SEPOLIA_ENTRYPOINT_ADDRESS as `0x${string}`;
  const SIMPLE_ACCOUNT_FACTORY_ADDRESS = process.env
    .SEPOLIA_SIMPLE_ACCOUNT_FACTORY_ADDRESS as `0x${string}`;
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
    policyId: process.env.SEPOLIA_PAYMASTER_POLICY_ID!,
    entryPoint: ENTRYPOINT_ADDRESS,
  });

  return signer;
}

import { RpcTransactionRequest, encodeFunctionData, etherUnits } from "viem";
// import {SmartAccountProvider} from "@alchemy/aa-core";
// import ERC20_ABI from "../ERC20.sol/ERC20.json";
// import {ERC20ABI} from "../ERC20.sol/ERC20";
// import {passkeyAccountABI} from "@alch-fam/shared";
// import {ethers} from "ethers";

/**** A simple file for sending tokens with a user op.
 * 1. @alchemy/aa-core and @alch-fam/shared must be installed in workspace.
 * 2. The calling component must be provided with wallet context, thus able to pass in the SmartAccountProvider.
 * 3. All typing is on this file, so client just needs to pass arguments.
 *
 * More info on
 * https://www.notion.so/alchemotion/AA-Demo-PAAY-Integration-a025cc243606419daa2e85feb66590e3?pvs=
 * Under the
 */
interface SmartAccountProvider {
  // Interface only to silence warning.
  sendUserOperation: (arg: any) => any;
}

interface TransactionContext {
  passkeyProvider: SmartAccountProvider;
  tokenAddress: `0x${string}`;
  recipientAddress: `0x${string}`;
  amount: bigint;
}

interface SendTransaction {
  (context: TransactionContext): Promise<string>;
}

// Called by client, creates the TransactionContext object.
export const sendTx = (
  passkeyProvider: SmartAccountProvider,
  tokenAddress: `0x${string}`,
  recipientAddress: `0x${string}`,
  amount: bigint
) => {
  const tx: TransactionContext = {
    passkeyProvider: passkeyProvider,
    tokenAddress: tokenAddress,
    recipientAddress: recipientAddress,
    amount: amount,
  };
  return sendSponsoredTransaction(tx);
};

// Takes in context, sends transaction using sendUserOp().
// Returns user op hash (this is NOT a tx hash).
const sendSponsoredTransaction: SendTransaction = async (
  context: TransactionContext
) => {
  if (!context.passkeyProvider) {
    throw new Error("Passkey provider is not set up");
  }

  const op = await context.passkeyProvider.sendUserOperation({
    target: context.recipientAddress,
    data: "0x",
    value: context.amount,
  });
  console.log("Hash" + op.hash);
  return op.hash;
};

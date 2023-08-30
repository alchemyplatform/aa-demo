// import {SmartAccountProvider} from "@alchemy/aa-core";

/**** A simple file for sending tokens with a user op.
 * 1. @alchemy/aa-core and @alch-fam/shared must be installed in workspace.
 * 2. The calling component must be provided with wallet context, thus able to pass in the SmartAccountProvider.
 * 3. All typing is on this file, so client just needs to pass arguments.
 *
 * More info on
 * https://www.notion.so/alchemotion/AA-Demo-PAAY-Integration-a025cc243606419daa2e85feb66590e3?pvs=
 * Under the Integration Guide
 */

interface SmartAccountProvider {
  // TODO: Remove this interface, only here to silence warning.
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
export const sendTx = async (
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
  return await sendSponsoredTransaction(tx);
};

// Takes in context, sends transaction using sendUserOp().
// Returns user op hash (this is NOT a tx hash).
const sendSponsoredTransaction: SendTransaction = async (
  context: TransactionContext
) => {
  if (!context.passkeyProvider) {
    throw new Error("Passkey provider is not set up");
  }

  /*
   * The data field in this call is empty. As implemented, this sendUserOperation()
   * call will transfer the native token. In order to send ERC-20, you must encode
   * the target ERC20 token, it's mint function, and it's parameters into the data field.
   * I recommend first testing that sending native token works, which will verify
   * your Smart Account Provider is properly connected. With the SAP working, switch
   * to encoding function data.
   */
  const op = await context.passkeyProvider.sendUserOperation({
    target: context.recipientAddress,
    data: "0x",
    value: context.amount,
  });

  return op.hash;
};

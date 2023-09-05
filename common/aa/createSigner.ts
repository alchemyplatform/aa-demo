import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import {
  LocalAccountSigner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
  type SimpleSmartAccountOwner,
} from "@alchemy/aa-core";
import * as dotenv from "dotenv";
import { sepolia } from "viem/chains";
dotenv.config();

const ALCHEMY_API_URL =
  "https://eth-sepolia.g.alchemy.com/v2/goSQbgxsETQW0xQlO6iCHpDmjmfjQFww";

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export async function createSigner(USER_PRIV_KEY: any) {
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

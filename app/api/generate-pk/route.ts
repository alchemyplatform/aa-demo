import * as secp from "@noble/secp256k1";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log(process.env.ALCHEMY_API_KEY);
  const body = await request.json();

  const privKey = secp.utils.randomPrivateKey();
  const privKeyHex = secp.etc.bytesToHex(privKey);

  const { username, password, userbase } = body;
  console.log(userbase);

  console.log("hello from the server");

  // console.log(userResponse);
}

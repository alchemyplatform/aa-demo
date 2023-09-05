import { createSigner } from "@common/aa/createSigner";
import * as secp from "@noble/secp256k1";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(process.env.ALCHEMY_API_KEY);
  const body = await request.json();

  const privKey = secp.utils.randomPrivateKey();
  const privKeyHex = secp.etc.bytesToHex(privKey);

  const userSigner = await createSigner(privKeyHex);

  const ownerAccount = userSigner.account;
  const ownerAddress = (ownerAccount as any).owner.owner.addres;

  return NextResponse.json({ ownerAddress: ownerAddress });
}

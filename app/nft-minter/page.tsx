"use client";
import { useAuth } from "@common/auth/AuthProvider";
import "../globals.css";

export default async function NftMinter() {
  const { user, login } = useAuth();

  async function handleClick() {
    const data = {
      userAddress: user?.userId,
    };
    const response = await fetch("/api/mint-user-op/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const messageResponse = await response.json();
  }

  // setSecretMessage(messageResponse.message);
  return (
    <div>
      <div className="btn" onClick={handleClick}>
        Click Me for Test
      </div>
    </div>
  );
}

"use client";
import { useAuth } from "@common/auth/AuthProvider";
import Hero from "@common/hero/Hero";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Home() {
  const { user, login } = useAuth();
  const router = useRouter();

  return (
    <div className="font-mono">
      <div>
        <Hero />
      </div>
    </div>
  );
}

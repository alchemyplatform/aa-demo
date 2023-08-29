"use client";
import { AuthProvider } from "@common/auth/AuthProvider";
import Navbar from "@common/navigation/navbar";
import Drawer from "@common/utils/Drawer";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY,
    walletConnectProjectId: process.env.CONNECT_KIT_PROJECT_ID!,

    // Required
    appName: "AA Demo written by Alchemy internal team",

    // Optional
    appDescription:
      "This app will function as a demo for account abstraction functionality using Alchemy.",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald">
      <AuthProvider>
        <WagmiConfig config={config}>
          <ConnectKitProvider mode="dark">
            <body className="flex flex-row h-full">
              <Drawer />
              <div className="flex-grow">
                <Navbar />
                <div className="flex-grow">{children}</div>
                {/* <Footer /> */}
              </div>
            </body>
          </ConnectKitProvider>
        </WagmiConfig>
      </AuthProvider>
    </html>
  );
}

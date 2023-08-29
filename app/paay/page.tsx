"use client";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@common/auth/AuthProvider";
import "../globals.css";
import Keypad from "@common/keypad";

const STATUS_NONE = "none";
const STATUS_SEARCH = "search";
const STATUS_CHOOSE_AMOUNT = "choose-amount";
const STATUS_CONFIRM = "confirm";
const STATUS_SENDING = "sending";
const STATUS_CONFIRMED = "confirmed";

const SendScreen = () => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(106);
  const [hash, setHash] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [to, setTo] = useState("");
  const { user } = useAuth();

  const [status, setStatus] = useState(STATUS_NONE);

  /**************************** Helper functions *****************************/
  const textHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const amountHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setAmount(event.currentTarget.value);
  };

  const keypadHandler = (num: string) => {
    setAmount(amount === "" ? num : amount + num);
  };

  // Closes modal and resets state.
  const closeModal = () => {
    setModalVisible(false);
    setStatus(STATUS_NONE);
    setHash("");
    setTo("");
    setAmount("");
  };

  /********* Step handler functions. One for each modal button click *********/
  // Strips text input and sets as destination address for transaction.
  const selectUser = () => {
    const res = search.startsWith("0x") ? search.slice(2) : search;
    setTo(res);
    setStatus(STATUS_CHOOSE_AMOUNT);
  };

  // Selects amount for transaction.
  // Balance checking logic with smart-contract here.
  const chooseAmount = () => {
    setAmount(amount);
    setStatus(STATUS_CONFIRM);
  };

  // Called when user confirms transaction.
  // Call to send user op function here.
  const confirmTx = async () => {
    setStatus(STATUS_SENDING);
    const recipientAdress = to;

    // Sleeping to demonstrate loading view. Delete when tx implemented.
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1000);

    // --------- Create the transaction object and send to userOp handler -----
    // const payment: TransactionContext = {
    //   passkeyProvider: walletProvider,
    //   tokenAddress: "0x4c1A52719d507827F8A3353bD0Aaf85BCc5Ce9a9", // Address of token to send
    //   recipientAddress: `0x${recipientAddress}`, // Gareth boutta be rich
    //   amount: parseEther(`${parseFloat(amount)}`),
    // };
    // const hash = await sendSponsoredTransaction(payment);

    finishTx("hash");
  };

  // Do any transaction status handling here, right now just sets hash for
  // Etherscan link.
  const finishTx = (hash: string) => {
    setHash(hash);
    setStatus(STATUS_CONFIRMED);
  };

  const renderModal = () => {
    switch (status) {
      case STATUS_SEARCH:
        return (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-[#999ea2] opacity-20 " /* Color is a grayscale of alice blue*/
              onClick={closeModal}
            />
            <div className="absolute flex text-center flex-col w-1/2 bg-[#FFFFFF] rounded-2xl overflow-scroll p-4">
              <h1 className="text-xl font-semibold">Send to</h1>
              <p className="text-sm text-gray-600 ml-3 mr-3">
                Type in your friend's address!
              </p>
              <input
                className="flex-1 text-base p-1 m-3 max-h-10 rounded-md bg-slate-200 focus:outline-none w-auto"
                type="text"
                placeholder="Search by address"
                onChange={textHandler}
                value={search}
              />
              {search.length === 0 ? (
                <button className="btn btn-disabled">Select</button>
              ) : (
                <button className="btn btn-primary" onClick={selectUser}>
                  Select
                </button>
              )}
            </div>
          </>
        );
      case STATUS_CHOOSE_AMOUNT:
        return (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-[#999ea2] opacity-20 " /* Color is a grayscale of alice blue*/
              onClick={closeModal}
            />
            <div className="absolute flex text-center flex-col w-auto bg-[#FFFFFF] rounded-2xl p-4 h-2/3 overflow-scroll">
              <h1 className="text-xl font-semibold">Choose amount</h1>
              <div className="flex flex-col flex-1 items-center">
                <input
                  type="text"
                  className="font-bold text-5xl focus:outline-none text-center"
                  placeholder="0"
                  min="0"
                  onChange={amountHandler}
                  value={amount}
                ></input>
                <Keypad onClick={keypadHandler}></Keypad>
                <button
                  className="btn btn-primary min-w-[262px]"
                  onClick={chooseAmount}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        );
      case STATUS_CONFIRM:
        return (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-[#999ea2] opacity-20 " /* Color is a grayscale of alice blue*/
              onClick={closeModal}
            />
            <div className="absolute flex text-center flex-col w-1/2 bg-[#FFFFFF] rounded-2xl overflow-scroll p-4 h-auto">
              <h1 className="text-xl font-semibold">Confirm Tx</h1>
              <div className="min-h-[200px] flex flex-col justify-between">
                <div className="flex flex-1 flex-row items-center justify-between bg-slate-100 rounded-lg m-2 pl-3 pr-3">
                  <p>To: </p>
                  <a
                    href={`https://etherscan.io/address/${to}`}
                    className={"underline"}
                  >
                    {to}
                  </a>
                </div>
                <div className="flex flex-1 flex-col justify-center bg-slate-100 border-t rounded-lg m-2 mt-0">
                  <div className="h-1/3 flex flex-row items-center justify-between pl-3 pr-3">
                    <span>Amount: </span>
                    <span>{amount}</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" onClick={confirmTx}>
                Confirm
              </button>
            </div>
          </>
        );
      case STATUS_SENDING:
        return (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-[#999ea2] opacity-20 " /* Color is a grayscale of alice blue*/
              onClick={closeModal}
            />
            <div className="absolute flex text-center flex-col w-auto bg-[#FFFFFF] rounded-2xl overflow-scroll p-4 h-1/4">
              <span className="text-xl font-semibold">Sending...</span>
              <span className="text-sm ml-3 mr-3">
                You are sending {amount} $FREE to:
              </span>
              <a
                href={`https://etherscan.io/address/${to}`}
                className={"underline"}
              >
                {to}
              </a>
              <div className="flex flex-1 items-center justify-center">
                <div className="flex justify-self-center w-14 h-14 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent" />
              </div>
            </div>
          </>
        );
      case STATUS_CONFIRMED:
        return (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-[#999ea2] opacity-20 " /* Color is a grayscale of alice blue*/
              onClick={closeModal}
            />
            <div className="absolute flex text-center flex-col w-1/4 bg-[#FFFFFF] rounded-2xl overflow-scroll p-4 h-1/4">
              <span className="text-xl font-semibold">Confirmed.</span>
              <div className="flex flex-col flex-1 justify-between mt-[20px]">
                <a
                  href={`https://etherscan.io/address/${hash}`}
                  className="btn bg-[#445dea] text-white"
                >
                  View on Etherscan
                </a>
                <button
                  className="btn bg-[#6ed09f] text-white"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  // Passes down setState so send button shows modal.
  const renderHome = () => {
    return (
      <HomeView
        balance={balance}
        showModal={() => {
          setStatus(STATUS_SEARCH);
          setModalVisible(true);
        }}
      />
    );
  };

  interface HomeViewProps {
    balance: number;
    showModal: () => void;
  }
  const HomeView: React.FC<HomeViewProps> = ({ balance, showModal }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="flex-row justify-center items-center">
          <h1 className="text-5xl font-bold">{balance}</h1>
        </div>
        <p className="text-xl font-bold">Alchemy PAAY Balance</p>
        {!modalVisible}
        <input
          className="btn btn-primary my-3"
          type="submit"
          value="Send Tokens"
          onClick={showModal}
        />
      </div>
    );
  };

  return (
    // Render
    <div className="display flex flex-col min-h-screen bg-base-200 justify-center items-center mt-[-48px] font-mono">
      {user?.isLoggedIn ? (
        modalVisible ? (
          renderModal()
        ) : null
      ) : (
        <h1 className="text-5xl font-bold">Log in to use PAAY!</h1>
      )}
      <HomeView
        balance={balance}
        showModal={() => {
          setModalVisible(true);
          setStatus(STATUS_SEARCH);
        }}
      />
    </div>
  );
};

export default SendScreen;

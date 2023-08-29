import React from "react";

interface HomeViewProps {
  balance: number;
  showModal: () => void;
}

// Contains no request logic, only renders the sending form
//
const HomeView: React.FC<HomeViewProps> = ({ balance, showModal }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex-row justify-center items-center">
        <h1 className="text-5xl font-bold">{balance}</h1>
      </div>
      <p className="text-xl font-bold">Alchemy PAAY Balance</p>
      <input
        className="btn btn-primary my-3"
        type="submit"
        value="Send Tokens"
        onClick={() => showModal()}
      />
    </div>
  );
};

export default HomeView;

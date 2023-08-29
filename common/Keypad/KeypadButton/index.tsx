import React from "react";

interface KeypadButtonProps {
  onClick: (num: string) => void;
  num: string;
}

const KeypadButton: React.FC<KeypadButtonProps> = ({ onClick, num }) => {
  return (
    <button
      className="h-full w-full rounded-2xl border-2 border-[#64748B] active:bg-[#64748B] active:text-white bg-[] text- text-lg font-bold hover:bg-[#eef8ff] m-1"
      onClick={() => onClick(num)}
    >
      {num}
    </button>
  );
};

export default KeypadButton;

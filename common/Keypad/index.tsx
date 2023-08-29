import KeypadButton from "@common/Keypad/KeypadButton";

interface KeypadProps {
  onClick: (num: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-between  min-w-[250px] p-4">
      <div className="flex flex-row flex-1 w-full justify-between m-1">
        <KeypadButton onClick={onClick} num={"1"} />
        <KeypadButton onClick={onClick} num={"2"} />
        <KeypadButton onClick={onClick} num={"3"} />
      </div>
      <div className="flex flex-row flex-1 w-full justify-between m-1">
        <KeypadButton onClick={onClick} num={"4"} />
        <KeypadButton onClick={onClick} num={"5"} />
        <KeypadButton onClick={onClick} num={"6"} />
      </div>
      <div className="flex flex-row flex-1 w-full justify-between m-1">
        <KeypadButton onClick={onClick} num={"7"} />
        <KeypadButton onClick={onClick} num={"8"} />
        <KeypadButton onClick={onClick} num={"9"} />
      </div>
      <div className="flex flex-row flex-1 w-full justify-between m-1">
        <KeypadButton onClick={onClick} num={"0"} />
        <KeypadButton onClick={onClick} num={"00"} />
        <KeypadButton onClick={onClick} num={"."} />
      </div>
    </div>
  );
};

export default Keypad;

import React, { useState } from "react";

type ToastProps = {
  message?: string;
  status?: "info" | "success" | "error"; // Add other statuses if needed
};

const ToastComponent: React.FC<ToastProps> = ({
  message = "Default Message",
  status = "success",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleToast = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleToast}>Toggle Toast</button>
      {isVisible && (
        <div className="toast toast-center">
          <div className={`alert alert-${status}`}>
            <span>{message}</span>
            <button onClick={toggleToast} className="ml-2">
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastComponent;

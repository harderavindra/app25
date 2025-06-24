import { useEffect } from "react";
import TimerProgressCircle from "./TimerProgressCircle"; // adjust path if needed

const SuccessAlert = ({ message, duration = 4000, onClose }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="px-3 py-2 mx-4 mt-4 bg-green-50 border border-green-400 rounded-md text-green-600 flex items-center gap-3">
      <TimerProgressCircle size={24} duration={duration} />
      <p>{message}</p>
    </div>
  );
};

export default SuccessAlert;
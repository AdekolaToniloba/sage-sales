import { useEffect } from "react";
import { Check } from "lucide-react";

const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        color: "black",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        maxWidth: "80%",
        animation: "slideDown 0.5s ease-out",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          borderRadius: "30%",
          padding: "4px",
          marginRight: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Check size={16} color="white" />
      </div>

      <span style={{ flex: 1 }}>{message}</span>
    </div>
  );
};

export default Toast;

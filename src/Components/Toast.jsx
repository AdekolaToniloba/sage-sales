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
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        display: "flex",
        alignItems: "stretch",
        maxWidth: "450px",
        maxHeight: "50px",
        width: "100%",
        animation: "slideDown 0.5s ease-out",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "48px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Check size={24} color="white" />
      </div>
      <div
        style={{
          padding: "14px 20px",
          fontSize: "16px",
          fontWeight: "500",
          flexGrow: 1,
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;

import React from "react";

type NotificationProps = {
  message: string | null;
  type: "error" | "success" | null | undefined;
};

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  if (!message) {
    return null;
  }

  let borderColor;
  let bgColor;
  let textColor;

  if (type === "error") {
    borderColor = "border-red-600";
    bgColor = "bg-red-300";
    textColor = "text-slate-500";
  }
  // Override colors based on type
  if (type === "success") {
    borderColor = "border-green-600";
    bgColor = "bg-green-300";
    textColor = "text-slate-700";
  }

  return (
    <div
      className={`flex border ${borderColor} ${bgColor} ${textColor} px-10 py-5 rounded-lg mb-5`}
    >
      {message}
    </div>
  );
};

export default Notification;

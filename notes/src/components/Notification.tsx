import React from "react";

type NotificationProps = {
  message: string | null;
};

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
export default Notification;

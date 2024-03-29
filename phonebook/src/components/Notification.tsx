import React from "react";
import { ErrorMessage } from "../App";

const Notification: React.FC<ErrorMessage> = ({ message, type }) => {
  if (message === null) return null;

  const cls = type === "success" ? "success" : "error";
  return <div className={cls}>{message}</div>;
};
export default Notification;

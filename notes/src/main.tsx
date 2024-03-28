import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

export type NoteType = {
  id: string;
  content: string;
  important: boolean;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

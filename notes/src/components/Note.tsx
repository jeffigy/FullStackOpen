import React from "react";
import { NoteType } from "../main";

type NoteProps = {
  note: NoteType;
  toggleImportance: () => void;
};

const Note: React.FC<NoteProps> = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
export default Note;

import React from "react";
import { NoteType } from "../App";

type NoteProps = {
  note: NoteType;
};

const Note: React.FC<NoteProps> = ({ note }) => {
  return <li>{note.content}</li>;
};
export default Note;

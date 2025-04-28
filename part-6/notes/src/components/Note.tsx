import { NoteType } from "../types/note";

const Note = ({ note }: { note: NoteType }) => {
  return <li>{note.content}</li>;
};

export default Note;

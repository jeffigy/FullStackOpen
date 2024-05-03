import React, { useState } from "react";

type NoteFormProps = {
  createNote: any;
};

const NoteForm: React.FC<NoteFormProps> = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createNote({
      content: newNote,
      important: true,
    });
  };
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default NoteForm;

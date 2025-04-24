import { NoteType } from "./types/note";
import Note from "./components/Note";
import React, { useState } from "react";

const notes: NoteType[] = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

function App() {
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note: NoteType) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;

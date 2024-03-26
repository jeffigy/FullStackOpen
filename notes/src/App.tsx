import { useState } from "react";
import Note from "./components/Note";
import { NoteType } from "./main";

type AppProps = {
  props: NoteType[];
};
const App: React.FC<AppProps> = ({ props }) => {
  const [notes, setNotes] = useState(props);
  const [newNote, setNewNote] = useState("");
  const [showAll, setshowAll] = useState(true);

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteObject: NoteType = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setshowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note: NoteType) => (
          <Note note={note} key={note.id} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

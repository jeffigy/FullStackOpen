import { useEffect, useState } from "react";
import Note from "./components/Note";
import { NoteType } from "./main";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState<NoteType[] | null>(null);
  const [newNote, setNewNote] = useState("");
  const [showAll, setshowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!notes) return null;

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = notes.length + 1;

    const noteObject: NoteType = {
      content: newNote,
      important: Math.random() < 0.5,
      id: id.toString(),
    };

    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res));
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id: string) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note!.important };

    noteService
      .update(id, changeNote as NoteType)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((_error) => {
        setErrorMessage(
          `Note '${note?.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setshowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note: NoteType) => (
          <Note
            note={note}
            key={note.id}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={(e) => e.target.value} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Not app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

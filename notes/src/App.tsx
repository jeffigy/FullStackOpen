import { useEffect, useState } from "react";
import Note from "./components/Note";
import { NoteType } from "./main";
import noteService from "./services/notes";
const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setshowAll] = useState(true);

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
        alert(`the note ${note?.content} was already deleted from the server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    noteService.getAll().then((initialData) => {
      setNotes(initialData);
    });
  }, []);

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
    </div>
  );
};

export default App;

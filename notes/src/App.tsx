import { SetStateAction, useEffect, useRef, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import { NoteType } from "./main";
import noteService from "./services/notes";
import loginServices from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
type User = {
  name: string;
  email: string;
  token: string;
};
const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showAll, setshowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject: any) => {
    noteFormRef.current?.toggleVisibility();
    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res));
    });
  };

  const toggleImportanceOf = (id: string) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote as NoteType)
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
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginServices.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(e: {
              target: { value: SetStateAction<string> };
            }) => setUsername(e.target.value)}
            handlePasswordChange={(e: {
              target: { value: SetStateAction<string> };
            }) => setPassword(e.target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user && <button onClick={handleLogout}>Logout</button>}
      {user === null ? loginForm() : noteForm()}
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
            toggleImportance={() => {
              if (note.id) {
                toggleImportanceOf(note.id);
              }
            }}
          />
        ))}
      </ul>
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

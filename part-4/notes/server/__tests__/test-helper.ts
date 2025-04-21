import { findAllUsers } from "@/services/user.service";
import { createNote, deleteNote, findAllNotes } from "@/services/note.service";
import { NoteInsert } from "@/types/note.type";

export const initialNotes: NoteInsert[] = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

export const nonExistingId = async () => {
  const { noteId } = await createNote({ content: "willremovethissoon" });

  await deleteNote(noteId);

  return noteId.toString();
};

export const notesInDb = async () => {
  return await findAllNotes();
};

export const usersInDb = async () => {
  return await findAllUsers();
};

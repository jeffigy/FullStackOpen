import React, { useState } from "react";
import { ContactPerson } from "../App";

type PersonFormProps = {
  persons: ContactPerson[];
  sendNewDataToParent: (data: ContactPerson[]) => void;
};

const PersonForm: React.FC<PersonFormProps> = ({
  persons,
  sendNewDataToParent,
}) => {
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPerson.name === "" || newPerson.number === "") {
      alert("Name and number cannot be empty");
      return;
    }

    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    const newContact = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    };

    sendNewDataToParent(persons.concat(newContact));
    alert(`${newPerson.name} successfully added to the phonebook`);
    setNewPerson({
      name: "",
      number: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>name: </p>
        <input
          type="text"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
        />
      </div>
      <div>
        <p>number: </p>
        <input
          type="text"
          value={newPerson.number}
          onChange={(e) =>
            setNewPerson({ ...newPerson, number: e.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
export default PersonForm;

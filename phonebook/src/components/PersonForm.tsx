import React, { useState } from "react";
import { ContactPerson, ErrorMessage } from "../App";
import personService from "../services/persons";
type PersonFormProps = {
  persons: ContactPerson[];
  sendNewDataToParent: (data: ContactPerson[]) => void;
  sendNotificationToParent: (data: ErrorMessage) => void;
};

const PersonForm: React.FC<PersonFormProps> = ({
  persons,
  sendNewDataToParent,
  sendNotificationToParent,
}) => {
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isContactExisted = persons.some(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    const id = persons.length + 1;
    const newContact = {
      name: newPerson.name,
      number: newPerson.number,
      id: id.toString(),
    };

    if (newPerson.name === "" || newPerson.number === "") {
      alert("Name and number cannot be empty");
      return;
    }

    if (isContactExisted) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const contactPerson = persons.find(
          (person) => person.name === newPerson.name
        );

        const changeContact = { ...contactPerson, number: newPerson.number };
        personService
          .updatePerson(contactPerson!.id, changeContact as ContactPerson)
          .then((returnedPerson) => {
            sendNewDataToParent(
              persons.map((person) =>
                person.id !== contactPerson!.id ? person : returnedPerson
              )
            );
          })
          .catch((_error) => {
            sendNotificationToParent({
              message: `Information of ${contactPerson?.name} has been removed from server`,
              type: "error",
            });
          });
        setNewPerson({
          name: "",
          number: "",
        });
      }
    } else {
      personService.newPerson(newContact).then((res) => {
        sendNewDataToParent(persons.concat(res));
        sendNotificationToParent({
          message: `Added ${newPerson.name}`,
          type: "success",
        });
        setTimeout(() => {
          sendNotificationToParent({ message: null, type: null });
        }, 5000);
        setNewPerson({
          name: "",
          number: "",
        });
      });
    }
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
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 75px",
            border: "none",
            backgroundColor: "#2761ff",
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;

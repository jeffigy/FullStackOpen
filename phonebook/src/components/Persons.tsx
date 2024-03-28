import React, { useEffect, useState } from "react";
import { ContactPerson } from "../App";
import personService from "../services/persons.ts";
type PersonsProps = {
  persons: ContactPerson[];
  sendUpdatedDataToParent: (data: ContactPerson[]) => void;
};

const Persons: React.FC<PersonsProps> = ({
  persons,
  sendUpdatedDataToParent,
}) => {
  const [list, setList] = useState<ContactPerson[]>([]);

  const handleDelete = (id: string) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person?.name} ?`)) {
      personService.deletePerson(id).then(() => {
        const updatedList = list.filter((contact) => contact.id !== id);
        setList(updatedList);
        sendUpdatedDataToParent(updatedList);
      });
    }
  };

  useEffect(() => {
    setList(persons);
  }, [persons]);

  return (
    <div>
      {list.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button
            onClick={() => handleDelete(person.id)}
            style={{
              backgroundColor: "#ff4343",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              marginLeft: "5px",
            }}
          >
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};
export default Persons;

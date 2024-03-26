import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
export type ContactPerson = {
  name: string;
  number: string;
  id: number;
};
const App = () => {
  const phonebook: ContactPerson[] = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];
  const [persons, setPersons] = useState(phonebook);

  const [searchInput, setSearchInput] = useState("");

  const getSearchDataFromChild = (data: string) => {
    setSearchInput(data);
  };

  const getNewDataFromChild = (data: ContactPerson[]) => {
    setPersons(data);
  };

  const filterContacts =
    searchInput === ""
      ? persons
      : persons.filter((contact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter sendDataToParent={getSearchDataFromChild} />
      <PersonForm sendNewDataToParent={getNewDataFromChild} persons={persons} />
      <h2>Numbers</h2>
      <Persons contactList={filterContacts} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
export type ContactPerson = {
  name: string;
  number: string;
  id: string;
};
const App = () => {
  const [persons, setPersons] = useState<ContactPerson[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const getSearchDataFromChild = (data: string) => {
    setSearchInput(data);
  };

  const getNewDataFromChild = (data: ContactPerson[]) => {
    setPersons(data);
  };

  const getUpdatedDataFromChild = (data: ContactPerson[]) => {
    setPersons(data);
  };
  const filterContacts =
    searchInput === ""
      ? persons
      : persons.filter((contact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  useEffect(() => {
    personService.getAllPerson().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter sendDataToParent={getSearchDataFromChild} />
      <PersonForm sendNewDataToParent={getNewDataFromChild} persons={persons} />
      <h2>Numbers</h2>
      <Persons
        persons={filterContacts}
        sendUpdatedDataToParent={getUpdatedDataFromChild}
      />
    </div>
  );
};

export default App;

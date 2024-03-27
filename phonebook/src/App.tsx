import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios, { AxiosResponse } from "axios";

export type ContactPerson = {
  name: string;
  number: string;
  id: number;
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

  const filterContacts =
    searchInput === ""
      ? persons
      : persons.filter((contact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res: AxiosResponse) => {
      const contacts = res.data;
      setPersons(contacts);
    });
  }, []);

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

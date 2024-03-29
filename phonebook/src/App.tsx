import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import "./index.css";
import Notification from "./components/Notification";

export type ContactPerson = {
  name: string;
  number: string;
  id: string;
};

export type ErrorMessage = {
  message: string | null;
  type: "success" | "error" | null;
};
const App = () => {
  const [persons, setPersons] = useState<ContactPerson[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>();

  const getSearchDataFromChild = (data: string) => {
    setSearchInput(data);
  };

  const getNotificationFromChild = (data: ErrorMessage) => {
    setErrorMessage(data);
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
      {errorMessage && errorMessage.message !== null && (
        <Notification
          message={errorMessage?.message}
          type={errorMessage?.type}
        />
      )}
      <Filter sendDataToParent={getSearchDataFromChild} />
      <PersonForm
        sendNewDataToParent={getNewDataFromChild}
        persons={persons}
        sendNotificationToParent={getNotificationFromChild}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filterContacts}
        sendUpdatedDataToParent={getUpdatedDataFromChild}
      />
    </div>
  );
};

export default App;

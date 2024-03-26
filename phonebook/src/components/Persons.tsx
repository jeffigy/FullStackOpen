import React, { useEffect, useState } from "react";
import { ContactPerson } from "../App";

type PersonsProps = {
  contactList: ContactPerson[];
};

const Persons: React.FC<PersonsProps> = ({ contactList }) => {
  const [list, setlist] = useState<ContactPerson[]>([]);

  useEffect(() => {
    setlist(contactList);
  }, [contactList]);

  return (
    <div>
      {list.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default Persons;

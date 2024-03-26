import React, { useState } from "react";

type FilterProps = {
  sendDataToParent: (data: string) => void;
};

const Filter: React.FC<FilterProps> = ({ sendDataToParent }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    sendDataToParent(value);
  };

  return (
    <div>
      {" "}
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};
export default Filter;

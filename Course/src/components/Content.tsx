import { PartsType } from "../App";

type ContentProps = {
  parts: PartsType[];
};

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <ul>
      {parts &&
        parts.map((part: PartsType) => {
          return (
            <li key={part.id}>
              {/* {part.name} */}
              <Part part={part} />
            </li>
          );
        })}
    </ul>
  );
};

export default Content;

import React from "react";

type PartProps = {
  part: PartsType;
};

const Part: React.FC<PartProps> = ({ part }) => {
  return (
    <p>
      {" "}
      {part.name} {part.exercises}
    </p>
  );
};

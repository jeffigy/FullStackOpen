import { PartsType } from "../App";

type TotalProps = {
  parts: PartsType[];
};
const Total: React.FC<TotalProps> = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>Number of exercises {total} </p>;
};

export default Total;

type DisplayProps = {
  counter: number;
};
const Display: React.FC<DisplayProps> = ({ counter }) => {
  return <div>{counter}</div>;
};

export default Display;

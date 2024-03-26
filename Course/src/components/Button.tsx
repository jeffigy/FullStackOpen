type ButtonType = {
  onClick: () => void;
  label: string;
};
const Button: React.FC<ButtonType> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;

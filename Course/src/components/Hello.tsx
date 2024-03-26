interface Person {
  name: string;
  age: number;
}

type HelloProps = {
  person: Person;
};
const Hello: React.FC<HelloProps> = ({ person }) => {
  const { name, age } = person;
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
  };
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

export default Hello;

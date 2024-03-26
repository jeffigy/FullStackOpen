import Course from "./components/Course";

export interface PartsType {
  name: string;
  exercises: number;
  id: number;
}
export type CourseType = {
  id: number;
  name: string;
  parts: PartsType[];
};
const App = () => {
  const courses: CourseType[] = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <>
      <h1
        style={{
          fontSize: "50px",
        }}
      >
        Web development curriculum
      </h1>
      {courses &&
        courses.map((course: CourseType) => {
          return <Course key={course.id} course={course} />;
        })}
    </>
  );
};

export default App;

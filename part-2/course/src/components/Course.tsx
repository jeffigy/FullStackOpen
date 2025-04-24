import { CoursePartType, CourseType } from "../types/course";
import Header from "./Header";

const Course = ({ course }: { course: CourseType }) => {
  const totalExercises = course.parts.reduce(
    (s, p: CoursePartType) => s + p.exercises,
    0
  );

  return (
    <div>
      <Header course={course} />
      <ul>
        {course.parts.map((part: CoursePartType) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
      <h3>total of {totalExercises} exercises</h3>
    </div>
  );
};

export default Course;

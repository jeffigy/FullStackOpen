import { CourseType } from "../types/course";

const Header = ({ course }: { course: CourseType }) => {
  return <h1>{course.name}</h1>;
};

export default Header;

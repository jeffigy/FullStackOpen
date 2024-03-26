import React from "react";
import { CourseType } from "../App";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

type CourseProps = {
  course: CourseType;
};

const Course: React.FC<CourseProps> = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};
export default Course;

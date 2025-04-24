export type CoursePartType = {
  name: string;
  exercises: number;
  id: number;
};

export type CourseType = {
  id: number;
  name: string;
  parts: CoursePartType[];
};

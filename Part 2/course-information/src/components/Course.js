import React from 'react';

const Header = ({ courseName }) => <h2>{courseName.name}</h2>;

const Total = ({ sumOfExercises }) => {
  const total = sumOfExercises.reduce((acc, currentValue) => {
    return acc + currentValue.exercises;
  }, 0);
  return <strong>Total of {total} exercises </strong>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ courseContent }) => {
  return (
    <>
      {courseContent.map(content => {
        return (
          <React.Fragment key={content.id}>
            <Part part={content} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header courseName={course} />
            <Content courseContent={course.parts} />
            <Total sumOfExercises={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

export default Course;

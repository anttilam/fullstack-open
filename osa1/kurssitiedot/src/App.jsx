const Header = ({ course }) => (
  <>
    <h1>{course.name}</h1>
  </>
);

const Part = ({ part, exer }) => {
  return <p>{part} {exer}</p>;
};

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <>
      {parts.map((part) => <Part part={part.name} exer={part.exercises} />)}
    </>
  );
};

const Total = ({ course }) => {
  const { parts } = course;
  let sum = 0;

  parts.forEach((part) => {
    sum += part.exercises;
  });

  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default App;

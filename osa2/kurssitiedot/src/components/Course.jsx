import { Fragment } from "react";

const Course = ({ courses }) => {
    return (
        <>
            {courses.map((course) => {
                const totalExercises = course.parts.reduce(
                    (sum, part) => sum + part.exercises,
                    0,
                );
                return (
                    <Fragment key={course.id}>
                        <Header header={course.name} />
                        <Content
                            parts={course.parts}
                            totalExercises={totalExercises}
                        />
                    </Fragment>
                );
            })}
        </>
    );
};

const Header = ({ header }) => {
    return (
        <>
            <h2>{header}</h2>
        </>
    );
};

const Content = ({ parts, totalExercises }) => {
    return (
        <>
            {parts.map((part) => (
                <Part
                    key={part.id}
                    part={part}
                />
            ))}
            <TotalParts num={totalExercises} />
        </>
    );
};

const Part = ({ part }) => {
    const { name, exercises } = part;

    return (
        <>
            <div>
                {name} {exercises}
            </div>
        </>
    );
};

const TotalParts = ({ num }) => {
    return (
        <>
            <p>
                <b>total of {num} exercises</b>
            </p>
        </>
    );
};

export default Course;

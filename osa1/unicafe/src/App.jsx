import { useState } from "react";

const StatButton = ({ setStat, feedBackType }) => {
  return (
    <button onClick={() => setStat(feedBackType)} type="button">
      {feedBackType}
    </button>
  );
};

const StatisticLine = ({ feedBackType, stat }) => {
  return (
    <tr>
      <td>{feedBackType}</td>{" "}
      <td>{stat}{`${feedBackType === "positive" ? "%" : ""}`}</td>
    </tr>
  );
};

const Feedback = ({ setStat, statState }) => {
  return (
    <div>
      <h1>Give feedback</h1>
      <StatButton setStat={setStat} feedBackType="good" />
      <StatButton setStat={setStat} feedBackType="neutral" />
      <StatButton setStat={setStat} feedBackType="bad" />
    </div>
  );
};

const Stats = ({ stats }) => {
  const { good, neutral, bad } = stats;

  const totalCount = good + neutral + bad;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        {totalCount !== 0
          ? (
            <>
              <StatisticLine feedBackType={"good"} stat={good} />
              <StatisticLine feedBackType={"neutral"} stat={neutral} />
              <StatisticLine feedBackType={"bad"} stat={bad} />
              <StatisticLine feedBackType={"all"} stat={totalCount} />
              <StatisticLine
                feedBackType={"average"}
                stat={totalCount / 3}
              />
              <StatisticLine
                feedBackType={"positive"}
                stat={(good / totalCount) * 100}
              />
            </>
          )
          : <p>No feedback given</p>}
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [statState, setStatState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleStatChange = (feedBackType) => {
    setStatState({ ...statState, [feedBackType]: statState[feedBackType] + 1 });
  };

  return (
    <div>
      <Feedback stats={statState} setStat={handleStatChange} />
      <Stats stats={statState} />
    </div>
  );
};

export default App;

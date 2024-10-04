import { useState } from "react";

const MostVotesAnecdote = ({ anecdote }) => {
  const { voteCount, text } = anecdote;
  return (
    <>
      <br />
      <h2>Anecdote with most votes</h2>
      <div>{text}</div>
      <div>has {voteCount} votes</div>
    </>
  );
};

const Anecdote = ({ voteAnecdote, generateNext, text, id, voteCount }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {text}
        <br />
        <p>has {voteCount} votes</p>
      </div>
      <div>
        <button onClick={() => voteAnecdote(id)}>vote</button>
        <button onClick={generateNext}>next anecdote</button>
        {"  "}
      </div>
    </>
  );
};

const App = () => {
  const [anecdoteData, setAnecdoteData] = useState([
    { id: 0, text: "If it hurts, do it more often.", voteCount: 0 },
    {
      id: 1,
      text: "Adding manpower to a late software project makes it later!",
      voteCount: 0,
    },
    {
      id: 2,
      text:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      voteCount: 0,
    },
    {
      id: 3,
      text:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      voteCount: 0,
    },
    {
      id: 4,
      text: "Premature optimization is the root of all evil.",
      voteCount: 0,
    },
    {
      id: 5,
      text:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      voteCount: 0,
    },
    {
      id: 6,
      text:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
      voteCount: 0,
    },
    { id: 7, text: "The only way to go fast, is to go well.", voteCount: 0 },
  ]);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomInt = Math.floor(Math.random() * anecdoteData.length ?? 8);
  const [currentAnecdote, setCurrentAnecdote] = useState(randomInt);

  //Go thru all the anecdote objects and return the one with highest notes
  const highestVotedAnecdote = anecdoteData &&
    Array.isArray(anecdoteData) && anecdoteData.reduce((prev, current) => {
      return (current.voteCount > prev.voteCount) ? current : prev;
    }, anecdoteData[0]);

  const handleNextAnecdoteClick = () => {
    setCurrentAnecdote(Math.floor(Math.random() * 8));
  };

  const handleVoteClick = (id) => {
    setAnecdoteData(
      anecdoteData.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, voteCount: anecdote.voteCount + 1 }
          : anecdote
      ),
    );

    //! Note to self to be careful. Turned it into an object, wanted it to stay as an array
    // setAnecdoteData({
    //   ...anecdoteData,
    //   [id]: { ...anecdoteData[id], voteCount: anecdoteData[id].voteCount + 1 },
    // });
  };

  return (
    <div>
      <Anecdote
        generateNext={handleNextAnecdoteClick}
        text={anecdoteData[currentAnecdote].text}
        id={anecdoteData[currentAnecdote].id}
        voteCount={anecdoteData[currentAnecdote].voteCount}
        voteAnecdote={handleVoteClick}
      />
      {highestVotedAnecdote && highestVotedAnecdote.voteCount > 0 &&
        <MostVotesAnecdote anecdote={highestVotedAnecdote} />}
    </div>
  );
};

export default App;

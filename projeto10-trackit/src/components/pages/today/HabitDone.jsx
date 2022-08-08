import styled from "styled-components";
import Context from "../../../context/context";
import { useState, useContext } from "react";
import { ReactComponent as CompletedButton } from "../../img/button.svg";
import axios from "axios";

export default function HabitDone({ habit }) {
  const [isDone, setIsDone] = useState(habit.done);
  const { setHabitDone, token } = useContext(Context);

  const toggleDone = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsDone(!isDone);
    if (isDone) {
      setHabitDone((habitDoned) => habitDoned.filter((id) => id !== habit.id));
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,
          config
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message));
    } else {
      console.log(habit.id);

      setHabitDone((habitDoned) => [...habitDoned, habit.id]);
      axios
        .post(
          `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,
          config
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <CompletedHabits isDone={isDone}>
      <div className="info">
        <h2>{habit.name}</h2>
        <p>
          Sequência atual: {habit.currentSequence} dia(s) <br /> Seu recorde:{" "}
          {habit.highestSequence} dia(s)
        </p>
      </div>
      <button onClick={() => toggleDone()}>
        <CompletedButton />
      </button>
    </CompletedHabits>
  );
}

const CompletedHabits = styled.div`
  margin-bottom: 1rem;
  display: flex;
  background-color: #fff;
  justify-content: center;
  border-radius: 1rem;
  .info {
    margin-right: 3.5rem;
    margin-top: 1rem;
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #666666;
    }
  }
  button {
    cursor: pointer;
    background-color: initial;
    border: none;
    svg {
      rect {
        fill: ${({ isDone }) => (isDone ? "#8fc549" : "#EBEBEB")};
      }
    }
  }
`;

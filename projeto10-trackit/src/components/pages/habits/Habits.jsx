import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Context from "../../../context/context";
import Day from "./Day";
import DayClosed from "./DayClosed";
import { ThreeDots } from "react-loader-spinner";
import { ReactComponent as Trash } from "../../img/trash.svg";
import Footer from "../../Footer";
import Header from "../../Header";

export default function Habits() {
  const [addForm, setAddForm] = useState(false);
  const [daysSelecteds, setDaysSelecteds] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [loader, setLoarder] = useState("Salvar");
  const [habitsList, setHabitsList] = useState([]);
  const [condicao, setCondicao] = useState(true);

  const { token } = useContext(Context);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise
      .then((res) => {
        setHabitsList(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function toggleDay(nmrDay, isSelected) {
    if (isSelected) {
      const arrayDays = [...daysSelecteds, nmrDay];
      setDaysSelecteds(arrayDays);
    } else {
      const arrayDays = daysSelecteds.filter((nmr) => {
        if (nmr !== nmrDay) return true;
        return false;
      });
      setDaysSelecteds(arrayDays);
    }
  }

  function sendHabit(e) {
    e.preventDefault();
    const body = {
      name: habitName,
      days: daysSelecteds,
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      config
    );
    promise
      .then((res) => {
        setLoarder(<ThreeDots color="white" />);
        setTimeout(() => {
          setHabitsList([...habitsList, body]);
          setAddForm(false);
          setLoarder("Salvar");
          setCondicao(false);
        }, 1000);
        setHabitName("");
        setDaysSelecteds([]);
      })

      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function deleteHabit(idHabit) {
    const validate = window.confirm("Deseja mesmo deletar o h??bito?");
    if (validate) {
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}`,
        config
      );
      promise
        .then(() => {
          const arrayHabit = habitsList.filter(({ id }) => {
            if (id !== idHabit) return true;
            return false;
          });
          setHabitsList(arrayHabit);
        })
        .catch((err) => console.log(err.message));
    }
  }

  return (
    <>
      <Header />

      <Container>
        <MyHabits>
          <h2>Meus h??bitos</h2>
          <button
            onClick={() => {
              setCondicao(true);
              setAddForm(true);
            }}
          >
            +
          </button>
        </MyHabits>

        {condicao && (
          <CreateHabit addForm={addForm}>
            <Form onSubmit={sendHabit}>
              <input
                required
                type="text"
                placeholder="nome do h??bito"
                value={habitName}
                onChange={({ target }) => setHabitName(target.value)}
              />

              <ul className="days">
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"D"}
                  nmrDay={0}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"S"}
                  nmrDay={1}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"T"}
                  nmrDay={2}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"Q"}
                  nmrDay={3}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"Q"}
                  nmrDay={4}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"S"}
                  nmrDay={5}
                />
                <Day
                  cursor={"pointer"}
                  toggleDay={toggleDay}
                  daysSelecteds={daysSelecteds}
                  nameDay={"S"}
                  nmrDay={6}
                />
              </ul>

              <div className="choice">
                <h4 onClick={() => setAddForm(false)}>cancelar</h4>
                <button type="submit">{loader}</button>
              </div>
            </Form>
          </CreateHabit>
        )}

        {habitsList.length === 0 ? (
          <p>
            Voc?? n??o tem nenhum h??bito cadastrado ainda. Adicione um h??bito para
            come??ar a trackear!
          </p>
        ) : (
          <></>
        )}

        <TotalHabits>
          {habitsList.map((habit, index) => {
            return (
              <HabitFinished key={index}>
                <div className="habitInfo">
                  <h2>{habit.name}</h2>

                  <button
                    className="trash"
                    onClick={() => deleteHabit(habit.id)}
                  >
                    <Trash />
                  </button>
                </div>
                <ul className="days">
                  <DayClosed
                    toggleDay={toggleDay}
                    isChoiced={habit.days.includes(0)}
                    daysSelecteds={daysSelecteds}
                    nameDay={"D"}
                    nmrDay={0}
                  />
                  <DayClosed isChoiced={habit.days.includes(1)} nameDay={"S"} />
                  <DayClosed isChoiced={habit.days.includes(2)} nameDay={"T"} />
                  <DayClosed isChoiced={habit.days.includes(3)} nameDay={"Q"} />
                  <DayClosed isChoiced={habit.days.includes(4)} nameDay={"Q"} />
                  <DayClosed isChoiced={habit.days.includes(5)} nameDay={"S"} />
                  <DayClosed isChoiced={habit.days.includes(6)} nameDay={"S"} />
                </ul>
              </HabitFinished>
            );
          })}
        </TotalHabits>
      </Container>

      <Footer />
    </>
  );
}

const Container = styled.div`
  margin-top: 9.1rem;
  margin-bottom: 8rem;
  padding: 0 1.8rem;

  p {
    margin-top: 3rem;
    font-size: 1.8rem;
    color: #666666;
  }
`;

const MyHabits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2.2rem;
    color: #126ba5;
  }

  button {
    user-select: none;
    cursor: pointer;
    margin-bottom: 2.2rem;

    width: 4rem;
    height: 3.5rem;

    text-align: center;
    font-size: 2.6rem;
    color: #fff;

    border: none;
    border-radius: 0.46rem;
    background-color: #52b6ff;
  }
`;

const CreateHabit = styled.div`
  display: ${(props) => (props.addForm ? "default" : "none")};

  width: 34rem;
  height: 18rem;

  border-radius: 0.5rem;
  background-color: #fff;
`;

const Form = styled.form`
  padding: 1.8rem;

  input {
    width: 30.3rem;
    height: 4.5rem;
    padding-left: 1.1rem;

    font-size: 2rem;
    color: #666666;

    border: 1px solid #d4d4d4;
    border-radius: 0.5rem;

    &::placeholder {
      font-size: 2rem;
      color: #dbdbdb;
    }
  }

  .days {
    display: flex;
    margin-top: 0.8rem;
  }

  .choice {
    margin-top: 2.9rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    h4 {
      cursor: pointer;
      font-size: 1.6rem;
      margin-right: 2.3rem;
      color: #52b6ff;
    }

    button {
      cursor: pointer;
      width: 8.4rem;
      height: 3.5rem;
      font-size: 1.6rem;

      border: none;
      border-radius: 0.4rem;
      color: #fff;
      background-color: #52b6ff;

      svg {
        height: 1rem;
      }
    }
  }
`;

const TotalHabits = styled.div``;

const HabitFinished = styled.div`
  margin-top: 1rem;
  width: 34rem;
  height: 9.1rem;
  padding: 1.3rem 1rem 1.5rem 1.5rem;

  border-radius: 0.5rem;
  background-color: #fff;

  .days {
    display: flex;
    margin-top: 0.8rem;
  }

  .habitInfo {
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 2rem;
      color: #666666;
    }

    .trash {
      border: none;
      background-color: #fff;

      svg {
        cursor: pointer;
        path {
          fill: #666666;
        }
      }
    }
  }
`;

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Context from "../context/context.js";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer() {
  const navigate = useNavigate();
  const { habitDone, habitsToday, percentage, setPercentage } =
    useContext(Context);

  useEffect(() => {
    setPercentage((habitDone.length / habitsToday.length) * 100);
  }, [habitDone]);

  return (
    <Bottom>
      <p onClick={() => navigate("/habits")}>Hábitos</p>

      <ProgressBar style={{ padding: "38px" }}>
        <button onClick={() => navigate("/today")}>
          <CircularProgressbar
            value={percentage}
            text="Hoje"
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52b6ff",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </button>
      </ProgressBar>

      <p onClick={() => navigate("/historic")}>Histórico</p>
    </Bottom>
  );
}

const Bottom = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  background-color: #fff;
  p {
    cursor: pointer;
    font-size: 1.8rem;
    color: #52b6ff;
  }
`;

const ProgressBar = styled.div`
  margin-bottom: 5rem;
  button {
    background-color: initial;
    width: 10rem;
    height: 10rem;
    border: none;
  }
  svg {
    cursor: pointer;
  }
`;

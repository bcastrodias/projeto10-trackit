import React from "react";
import styled from "styled-components";
import trackit from "./img/TrackIt.svg";
import Context from "../context/context.js";
import { useContext } from "react";

export default function Header() {
  const { image } = useContext(Context);

  return (
    <Top>
      <img src={trackit} />
      <img id="userimg" src={image} />
    </Top>
  );
}

const Top = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.8rem;
  height: 7rem;
  background-color: #126ba5;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.15);
  #userimg {
    border-radius: 9.9rem;
    width: 5.1rem;
    height: 5.1rem;
  }
`;

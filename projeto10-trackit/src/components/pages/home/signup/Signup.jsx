import logo from "../../../img/logo.svg";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [locked, setLocked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("Cadastrar");

  function register(e) {
    console.log([email, name, image, password]);
    e.preventDefault();
    setLoading(<ThreeDots color="white" />);
    setLocked(true);

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
          email,
          name,
          image,
          password,
        }
      )
      .then(() => {
        setLoading(<ThreeDots color="white" />);
        navigate("/");
      })
      .catch(() => {
        alert("Dados preenchidos de forma inválida");
        setLoading("Cadastrar");
        setLocked(false);
      });
  }
  return (
    <Container>
      <img src={logo} />
      <form onSubmit={register}>
        <input
          disabled={locked}
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          disabled={locked}
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          disabled={locked}
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          disabled={locked}
          type="text"
          placeholder="foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">{loading}</button>
      </form>
      <h1 onClick={() => navigate("/")}>Já tem uma conta? Faça login!</h1>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6.8rem;
  img {
    display: flex;
    margin: 0 auto;
    margin-bottom: 3.2rem;
  }
  h1 {
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
    font-size: 1.4rem;
    color: #52b6ff;
    text-decoration: underline;
  }
  form {
    display: flex;
    flex-direction: column;
    display: flex;
    flex-direction: column;
    input {
      width: 30.3rem;
      height: 4.5rem;
      border-radius: 0.5rem;
      margin-bottom: 0.6rem;
      font-size: 2rem;
      color: #666666;
      padding-left: 1rem;
      background-color: #fff;
      border: 1px solid #d5d5d5;
      &::placeholder {
        color: #a8a7a7;
        font-size: 2rem;
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 4.5rem;
      width: 30.3rem;
      font-size: 2.1rem;
      color: #fff;
      border-radius: 0.4rem;
      border: none;
      background-color: #52b6ff;
    }
  }
`;

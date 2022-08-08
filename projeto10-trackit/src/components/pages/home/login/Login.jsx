import logo from "../../../img/logo.svg";
import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Context from "../../../../context/context";

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(Context);
  const { setImage } = useContext(Context);
  const [locked, setLocked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("Entrar");
  function enter(e) {
    e.preventDefault();
    setLoading(<ThreeDots color="white" />);

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        {
          email,
          password,
        }
      )
      .then((answer) => {
        setLocked(true);
        setToken(answer.data.token);
        setImage(answer.data.image);
        setTimeout(() => {
          navigate("/today");
        }, 1000);
      })
      .catch(() => {
        setLocked(true);
        alert("Login ou senha inválidos");
        setLoading("Entrar");
        setLocked(false);
        setPassword("");
      });
  }
  return (
    <Container>
      <img src={logo} />
      <form onSubmit={enter}>
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
        <button type="submit">{loading}</button>
      </form>
      <h1 onClick={() => navigate("/signup")}>
        Não tem uma conta? Cadastre-se!
      </h1>
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

const Body = styled.body`
  body {
    background-color: #fff;
  }
`;

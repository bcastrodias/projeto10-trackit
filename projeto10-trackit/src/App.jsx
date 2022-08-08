import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Context from "./context/context";
import Login from "./components/pages/home/login/Login";
import Signup from "./components/pages/home/signup/Signup";
import Habits from "./components/pages/habits/Habits";
import Today from "./components/pages/today/Today";
import Historic from "./components/pages/historic/Historic";

export default function App() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [habitDone, setHabitDone] = useState([]);
  const [habitsToday, setHabitsToday] = useState([]);
  const [percentage, setPercentage] = useState(
    (habitDone.length / habitsToday.length) * 100
  );

  return (
    <>
      <Context.Provider
        value={{
          token,
          setToken,
          image,
          setImage,
          habitDone,
          setHabitDone,
          habitsToday,
          setHabitsToday,
          percentage,
          setPercentage,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/today" element={<Today />} />
            <Route path="/historic" element={<Historic />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

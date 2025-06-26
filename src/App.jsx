import { useState, useEffect, useRef } from "react";
import Quiz from "./Components/Quiz";
import Intro from "./Components/Intro";

export default function App() {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState(() => []);
  const [isFinished, setIsFinished] = useState(false);

  //Derivated variables
  const correctAnswerCount = data.filter(
    (d) => d.selected_answer === d.correct_answer
  ).length;

  const url = "https://opentdb.com/api.php?amount=5";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error de Red: ${response.status}`);
        }
        const dataInfo = await response.json();
        setData(
          dataInfo.results.map((item) => {
            const allAnswers = [...item.incorrect_answers, item.correct_answer];
            const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
            return {
              ...item,
              selected_answer: null,
              all_answers: shuffledAnswers,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [isShow]);

  function toggleQuiz() {
    setIsShow(!isShow);
  }

  function handleCheckAnswers() {
    setIsFinished(true);
  }

  function handleResetGame() {
    setIsShow(false);
    setIsFinished(false);
  }

  return (
    <main>
      <div className="round-top"></div>
      <div className="round-bottom"></div>
      {!isShow && <Intro toggleQuiz={toggleQuiz} />}
      {isShow && (
        <Quiz
          setData={setData}
          isFinished={isFinished}
          handleCheckAnswers={handleCheckAnswers}
          handleResetGame={handleResetGame}
          correctAnswerCount={correctAnswerCount}
          data={data}
        />
      )}
    </main>
  );
}

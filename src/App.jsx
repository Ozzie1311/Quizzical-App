import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { clsx } from "clsx";

export default function App() {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState([]);

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
            return { ...item, selected_answer: null };
          })
        );
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  console.log(data);

  function toggleQuiz() {
    setIsShow(!isShow);
  }

  function selectedAnswer(questionIndex, answerValue) {
    setData((prevData) =>
      prevData.map((item, index) => {
        return questionIndex === index
          ? { ...item, selected_answer: answerValue }
          : item;
      })
    );
  }

  function checkAnswers() {
    const filterAnswers = data.filter(
      (dataObj) => dataObj.selected_answer === dataObj.correct_answer
    );
    return filterAnswers.length;
  }

  const renderData = data.map((item, index) => {
    const answers = [...item.incorrect_answers, item.correct_answer];

    return (
      <li className="question" key={index}>
        <h3>{decode(item.question)}</h3>
        {answers.map((ans) => {
          const buttonClasses = clsx({
            selected: ans === item.selected_answer,
          });

          return (
            <button
              className={buttonClasses}
              onClick={() => selectedAnswer(index, ans)}
              key={ans}
            >
              {decode(ans)}
            </button>
          );
        })}
      </li>
    );
  });

  return (
    <>
      <div className="round-top"></div>
      <div className="round-bottom"></div>
      <main>
        {!isShow && (
          <section className="intro">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button className="start" onClick={toggleQuiz}>
              Start quiz
            </button>
          </section>
        )}
        {isShow && (
          <section className="quiz">
            {renderData}
            <button className="check" onClick={checkAnswers}>
              Check Answers
            </button>
          </section>
        )}
        <section className="check">
          You scored {checkAnswers()} / {data.length} correct answers{" "}
        </section>
      </main>
    </>
  );
}

import { useState } from "react";

export default function App() {
  const [isShow, setIsShow] = useState(false);
  const data = [
    {
      question: "How would one say goodbye in Spanish?",
      answers: ["Adiós", "Hola", "Au Revoir", "Salir"],
    },
    {
      question:
        "Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
      answers: [
        "Cabbage Patch Kids",
        "Transformers",
        "Care Bears",
        "Rubik's Cube",
      ],
    },
    {
      question: "What is the hottest planet in our Solar System?",
      answers: ["Mercury", "Venus", "Mars", "Saturn"],
    },
    {
      question: "In which country was the caesar salad invented?",
      answers: ["Italy", "Portugal", "México", "France"],
    },
    {
      question: "How Many Hearts Does An Octopus Have?",
      answers: ["One", "Two", "Three", "Four"],
    },
  ];

  function toggleQuiz() {
    setIsShow(!isShow);
  }

  const renderData = data.map((item, index) => (
    <li className="question" key={index}>
      <h3>{item.question}</h3>
      {item.answers.map((ans) => (
        <button key={ans}>{ans}</button>
      ))}
    </li>
  ));

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
            <button className="check">Check Answers</button>
          </section>
        )}
      </main>
    </>
  );
}

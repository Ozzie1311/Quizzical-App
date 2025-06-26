import { decode } from "html-entities";
import { clsx } from "clsx";

export default function Quiz({
  isFinished,
  handleCheckAnswers,
  handleResetGame,
  correctAnswerCount,
  data,
  setData,
}) {
  function selectedAnswer(questionIndex, answerValue) {
    setData((prevData) =>
      prevData.map((item, index) => {
        return questionIndex === index
          ? { ...item, selected_answer: answerValue }
          : item;
      })
    );
  }
  const renderData = data.map((item, index) => {
    return (
      <li className="question" key={index}>
        <h3>{decode(item.question)}</h3>
        {item.all_answers.map((ans) => {
          const isCorrect = ans === item.correct_answer;
          const isSelected = ans === item.selected_answer;

          const buttonClasses = clsx({
            selected: !isFinished && isSelected,
            correct: isFinished && isCorrect,
            incorrect: isFinished && isSelected && !isCorrect,
            unselected: isFinished && !isSelected,
          });

          return (
            <button
              className={buttonClasses}
              onClick={() => selectedAnswer(index, ans)}
              key={ans}
              disabled={isFinished}
            >
              {decode(ans)}
            </button>
          );
        })}
      </li>
    );
  });
  return (
    <section className="quiz">
      {renderData}
      {!isFinished ? (
        <button className="check" onClick={handleCheckAnswers}>
          Check Answers
        </button>
      ) : (
        <div className="status-container">
          <p>
            {`You scored ${correctAnswerCount}/${data.length} correct answers`}
          </p>
          <button className="play-again" onClick={handleResetGame}>
            Quiz again
          </button>
        </div>
      )}
    </section>
  );
}

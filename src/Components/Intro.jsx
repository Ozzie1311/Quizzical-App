export default function Intro({ toggleQuiz }) {
  return (
    <section className="intro">
      <h1>Quizzical</h1>
      <p>Test your knowledge with a simple quiz</p>
      <button className="start" onClick={toggleQuiz}>
        Start quiz
      </button>
    </section>
  );
}

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer } = props;

  const selectAnswerHandler = (answer_id) => {
    selectAnswer(answer_id);
  };

  const submitAnswerHandler = () => {
    postAnswer(quiz.quiz_id, selectedAnswer);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer ${
                  selectedAnswer === quiz.answers[0].answer_id ? "selected" : null
                }`}
              >
                {quiz.answers[0].text}
                <button onClick={() => selectAnswerHandler(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={`answer ${
                  selectedAnswer === quiz.answers[1].answer_id ? "selected" : null
                }`}
              >
                {quiz.answers[1].text}
                <button onClick={() => selectAnswerHandler(quiz.answers[1].answer_id)}>
                  {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              disabled={selectedAnswer ? null : "disabled"}
              onClick={submitAnswerHandler}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedAnswer: state.selectedAnswer,
    quiz: state.quiz,
  };
};

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);

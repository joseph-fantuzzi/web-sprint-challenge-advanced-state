import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchQuiz, selectAnswer } from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer } = props;

  const selectAnswerHandler = () => {
    selectAnswer();
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
              <div className="answer selected">
                {quiz.answers[0].text}
                <button onClick={selectAnswerHandler}>SELECTED</button>
              </div>

              <div className="answer">
                {quiz.answers[1].text}
                <button onClick={selectAnswerHandler}>Select</button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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

export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz);

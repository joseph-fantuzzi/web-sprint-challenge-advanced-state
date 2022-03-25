// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

export function moveClockwise(nextId) {
  return { type: MOVE_CLOCKWISE, payload: nextId };
}

export function moveCounterClockwise(nextId) {
  return { type: MOVE_COUNTERCLOCKWISE, payload: nextId };
}

export function selectAnswer(answer_id) {
  return { type: SET_SELECTED_ANSWER, payload: answer_id };
}

export function setMessage(payload) {
  return { type: SET_INFO_MESSAGE, payload: payload };
}

export function setQuiz(payload) {
  return { type: SET_QUIZ_INTO_STATE, payload: payload };
}

export function inputChange(id, value) {
  return { type: INPUT_CHANGE, payload: { id, value } };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(false));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
      .then((res) => {
        dispatch({ type: SET_SELECTED_ANSWER, payload: null });
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz({ newQuestion, newTrueAnswer, newFalseAnswer }) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      })
      .then((res) => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch((err) => {
        dispatch(setMessage(err.response.data.message));
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

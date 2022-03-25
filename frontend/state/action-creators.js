// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
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

export function setMessage() {}

export function setQuiz() {}

export function inputChange() {}

export function resetForm() {}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE, payload: null });
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    dispatch({ type: SET_SELECTED_ANSWER, payload: null });
    axios
      .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
      .then((res) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
      })
      .catch((err) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: err.response.data.message });
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

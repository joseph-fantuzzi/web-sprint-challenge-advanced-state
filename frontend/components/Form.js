import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { inputChange, form } = props;

  const onChange = (evt) => {
    const { id, value } = evt.target;
    inputChange(id, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={"disabled"}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
  };
};

export default connect(mapStateToProps, actionCreators)(Form);

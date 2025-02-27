import React, { useState } from "react";
import PropTypes from "prop-types";

const InputQuestion = ({ onQuestionSubmit }) => {
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit up to the parent
    onQuestionSubmit(question);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="question"
          className="form-control form-control-lg"
          placeholder="Enter your question"
          value={question}
          onChange={handleChange}
        />
      </div>
      <input type="submit" className="btn btn-info btn-block" />
    </form>
  );
};

InputQuestion.propTypes = {
  onQuestionSubmit: PropTypes.func.isRequired,
};

export default InputQuestion;

import React, { useState } from "react";
import InputQuestion from "./InputQuestion"; // your existing code
import "./MultiStepQuestion.css";

const MultiStepQuestion = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("");

  // When the InputQuestion form is submitted
  const handleSubmit = (userQuestion) => {
    setQuestion(userQuestion);
    setStep(2);
  };

  const handleAddAnother = () => {
    setQuestion("");
    setStep(1);
  };

  return (
    <div id="msform">
      <ul id="progressbar">
        <li className={step >= 1 ? "active" : ""}>Enter Question</li>
        <li className={step >= 2 ? "active" : ""}>Submitted</li>
      </ul>

      {step === 1 && (
        <fieldset>
          <h2 className="fs-title">Enter Your Question</h2>
          <InputQuestion onQuestionSubmit={handleSubmit} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <h2 className="fs-title">Question Submitted!</h2>
          <p>Your question was: {question}</p>
          <input
            type="button"
            className="action-button"
            value="Add Another"
            onClick={handleAddAnother}
          />
        </fieldset>
      )}
    </div>
  );
};

export default MultiStepQuestion;

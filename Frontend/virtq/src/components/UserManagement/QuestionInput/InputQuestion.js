import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function InputQuestion({ errors }) {
  const [question, setQuestion] = useState('');
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newQuestion = { question };
    console.log('Question submitted', newQuestion);
  };

  return (
    <div className="input-question top">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Enter Your Question</h1>
            <form onSubmit={onSubmit} className="form-group">
              <input
                type="text"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': localErrors.question,
                })}
                placeholder="Enter your question"
                name="question"
                value={question}
                onChange={onChange}
              />
              {localErrors.question && (
                <div className="invalid-feedback">{localErrors.question}</div>
              )}
              <input
                type="submit"
                className="btn btn-info btn-block mt-3"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

InputQuestion.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default InputQuestion;

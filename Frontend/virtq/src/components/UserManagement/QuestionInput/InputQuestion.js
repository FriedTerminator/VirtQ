import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createQuestion } from '../../../actions/questionActions';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

function InputQuestion({ errors, createQuestion }) {
  const [question, setQuestion] = useState('');
  const [localErrors, setLocalErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({type: null, message: ''});

  const {qaIdentifier} = useParams();

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  const onChange = (e) => setQuestion(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setNotice({type: null, message: ''});
    setSubmitting(true)
    try {
      const newQuestion = { text: question };
      const res = await createQuestion(qaIdentifier, newQuestion);

      if(res && res.status === 201) {
        setQuestion('');
        setLocalErrors({});
        setNotice({type: 'success', message: 'Your question was submitted successfully.'});
      } else {
        const msg = (errors && (errors.general || errors.text || errors.message)) ||
        'Could not submit your question. Please try again.';
        setNotice({type: 'danger', message: msg});
      }
    } catch (err) {
      setNotice({type: 'danger', message: 'Something went wrong. Please try again.'});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="input-question top">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Enter Your Question</h1>

              {/* Notice banner */}
              {notice.type && (
                <div
                  className={`alert alert-${notice.type} mt-3`}
                  role="status"
                  aria-live="polite"
                >
                  {notice.message}
                </div>
              )}

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
                disabled={submitting}
                aria-disabled={submitting}
              />
              {localErrors.question && (
                <div className="invalid-feedback">{localErrors.question}</div>
              )}

              <button
                type="submit"
                className="btn btn-info btn-block mt-3"
                disabled={!question.trim() || submitting}
              >{submitting ? 'Submitting...' : 'Submit'}</button>

              <div className="form-text text-muted mt-2">
                Keep it on-topic. Inappropriate or off-topic questions will be rejected.
              </div>
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

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, {createQuestion })(InputQuestion);
import React, { Component } from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';

class InputQuestion extends Component {
    constructor() {
        super()

        this.state = {
            question: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newQuestion = {
            question: this.state.question
        };

        console.log("Question submitted", newQuestion);
    }

  render() {
    const { errors } = this.state;
    return (
      <div className="input-question top">
        <div className="container">
            <div className="row">
                <h1 className="display-4 text-center">Enter Your Question</h1>
                <div className="form-group">
                    <input 
                    type="question" 
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.question
                    })}
                    placeholder="Enter your question"
                    name="question"
                    value={this.state.question}
                    onChange={this.onChange}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.question}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block " />
            </div>
        </div>
      </div>
    )
  }
}

InputQuestion.props = {
    errors: PropTypes.object.isRequired
};

export default InputQuestion;
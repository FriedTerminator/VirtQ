import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQA } from "../../actions/q&aActions";
import { getQuestions, deleteQuestion } from "../../actions/questionActions";

function Details({ currentQA, getQA, getQuestions, deleteQuestion, questions }) {
    const { qaIdentifier } = useParams();

    useEffect(() => {
        if(qaIdentifier) {
            getQA(qaIdentifier);
            getQuestions(qaIdentifier);
        }
    }, [qaIdentifier, getQA, getQuestions]);

    const handleDeleteQuestion = (questionId) => {
        if(window.confirm("Delete this question?")) {
            deleteQuestion(questionId)
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Q&A Session Details</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{currentQA.name}</h4>
                            <p><strong>ID:</strong> {currentQA.qaIdentifier}</p>
                            <p><strong>Passcode:</strong> {currentQA.passcode}</p>
                            <p><strong>Created:</strong> {new Date(currentQA.create_At).toLocaleDateString()}</p>
                            <p><strong>Leader:</strong> {currentQA.qaLeader}</p>

                            <Link to="/dashboard" className="btn btn-primary mt-3">← Back to Dashboard</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Questions</h5>
                            {questions && questions.length > 0 ? (
                                <ul className="list-group">
                                    {questions.map((q, index) => (
                                        <li key={index} className="list-group-item">
                                            {q.text}
                                            <button 
                                            className="btn btn-primary shadow-lg">Approve</button>
                                            <button 
                                            className="btn btn-danger shadow-lg" 
                                            onClick={() => handleDeleteQuestion(q.questionId)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No questions yet.</p>  
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentQA: state.qa.currentQA,
    questions: state.qa.questions
});

export default connect(mapStateToProps, { getQA, getQuestions, deleteQuestion })(Details);
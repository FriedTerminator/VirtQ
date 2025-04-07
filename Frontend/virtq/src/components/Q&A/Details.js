import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQA } from "../../actions/q&aActions";

function Details({ currentQA, getQA }) {
    const { qaIdentifier } = useParams();

    useEffect(() => {
        if(qaIdentifier) {
            getQA(qaIdentifier);
        }
    }, [qaIdentifier, getQA]);

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Q&A Session Details</h2>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{currentQA.name}</h4>
                    <p><strong>ID:</strong> {currentQA.qaIdentifier}</p>
                    <p><strong>Passcode:</strong> {currentQA.passcode}</p>
                    <p><strong>Created:</strong> {new Date(currentQA.create_At).toLocaleDateString()}</p>
                    <p><strong>Leader:</strong> {currentQA.qaLeader}</p>

                    <Link to="/dashboard" className="btn btn-secondary mt-3">← Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentQA: state.qa.currentQA
});

export default connect(mapStateToProps, { getQA })(Details);
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EnterPasscode() {
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.get(`/api/qa/passcode/${passcode}`);
            const qaId = res.data.qaIdentifier;
            navigate(`/submit/${qaId}`);
        } catch(error) {
            setError('Invalid passcode. Please try again.');
        }
    };

    return(
        <div className="enter-passcode top">
            <div className="container mt-5">
                <h2 className="text-center mb-4">Enter Q&A Passcode</h2>
                <form onSubmit={onSubmit} className="form-group text-center">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                    {error && <div className="text-danger mt-2">{error}</div>}
                    <input 
                        type="submit"
                        value="Continue"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    );
}

export default EnterPasscode;
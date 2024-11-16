import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLoan = () => {
    const [borrowerName, setBorrowerName] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/loans', {
            borrowerName,
            loanAmount,
            dueDate,
        });
        navigate('/'); // Use navigate to redirect
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Add New Loan</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Borrower Name:</label>
                    <input
                        type="text"
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Loan Amount:</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Loan</button>
            </form>
        </div>
    );
};

export default AddLoan;
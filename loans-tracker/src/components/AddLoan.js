import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './AddLoan.css'; // Import custom CSS

const AddLoan = () => {
    const [borrowerName, setBorrowerName] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLoan = { borrowerName, loanAmount, amountPaid, dueDate };
        await axios.post('http://localhost:5000/loans', newLoan);
        navigate('/'); // Use navigate to redirect after adding a loan
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Add Loan</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        className="rounded-input"
                        placeholder=" "
                        value={borrowerName}
                        onChange={(e) => setBorrowerName(e.target.value)}
                        required
                    />
                    <label className="input-label">Borrower Name</label>
                </div>
                <div className="input-container">
                    <input
                        type="number"
                        className="rounded-input"
                        placeholder=" "
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                    <label className="input-label">Loan Amount</label>
                </div>
                <div className="input-container">
                    <input
                        type="number"
                        className="rounded-input"
                        placeholder=" "
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        required
                    />
                    <label className="input-label">Amount Paid</label>
                </div>
                <div className="input-container">
                    <input
                        type="date"
                        className="rounded-input"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <label className="input-label">Due Date</label>
                </div>
                <button type="submit" className="submit-button">Add Loan</button>
            </form>
        </div>
    );
};

export default AddLoan;
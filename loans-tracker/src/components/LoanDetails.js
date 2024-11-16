import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LoanDetails = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [partialPayment, setPartialPayment] = useState('');
    const [isPartialPayment, setIsPartialPayment] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoan = async () => {
            const response = await axios.get(`http://localhost:5000/loans/${id}`);
            setLoan(response.data);
            setNewNote(response.data.notes || ''); // Initialize newNote with existing notes
        };
        fetchLoan();
    }, [id]);

    const updateStatus = async (status) => {
        if (status === 'partially paid') {
            const amountPaid = parseFloat(partialPayment);
            if (isNaN(amountPaid) || amountPaid <= 0) {
                alert('Please enter a valid amount for partial payment.');
                return;
            }
            await axios.put(`http://localhost:5000/loans/${id}`, { status, amountPaid });
        } else {
            await axios.put(`http://localhost:5000/loans/${id}`, { status });
        }
        navigate('/loans');
    };

    const saveNote = async () => {
        if (!newNote) {
            alert('Please enter a note.');
            return;
        }
        await axios.post(`http://localhost:5000/loans/${id}/note`, { note: newNote });
        const updatedLoan = await axios.get(`http://localhost:5000/loans/${id}`);
        setLoan(updatedLoan.data); // Update the loan state with the new note
    };

    if (!loan) return <div>Loading...</div>;

    return (
        <div>
            <h2>Loan Details for {loan.borrowerName}</h2>
            <p>Loan Amount: ${loan.loanAmount}</p>
            <p>Amount Paid: ${loan.amountPaid}</p>
            <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
            <p>Status: {loan.status}</p>
            <h3>Note</h3>
            <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Edit your note here"
            />
            <button onClick={saveNote}>Save Note</button>
            <h3>Update Status</h3>
            <button onClick={() => updateStatus('paid')}>Mark as Paid</button>
            <button onClick={() => updateStatus('unpaid')}>Mark as Unpaid</button>
            <button onClick={() => {
                setIsPartialPayment(true);
            }}>Partially Paid</button>
            {isPartialPayment && (
                <div>
                    <input
                        type="number"
                        value={partialPayment}
                        onChange={(e) => setPartialPayment(e.target.value)}
                        placeholder="Enter amount paid"
                    />
                    <button onClick={() => updateStatus('partially paid')}>Submit Partial Payment</button>
                </div>
            )}
        </div>
    );
};

export default LoanDetails;
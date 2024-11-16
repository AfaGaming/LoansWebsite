import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LoanDetails = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to track if we are editing notes
    const [newNote, setNewNote] = useState(''); // State to hold the new note input
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoan = async () => {
            const response = await axios.get(`http://localhost:5000/loans/${id}`);
            setLoan(response.data);
            setNewNote(response.data.notes || ''); // Initialize newNote with existing notes if any
        };
        fetchLoan();
    }, [id]);

    const updateStatus = async (status) => {
        await axios.put(`http://localhost:5000/loans/${id}`, { status });
        setLoan({ ...loan, status });
    };

    const saveNotes = async () => {
        await axios.put(`http://localhost:5000/loans/${id}`, { notes: newNote });
        setLoan({ ...loan, notes: newNote }); // Update the loan state with the new note
        setIsEditing(false); // Exit editing mode after saving
        setNewNote(''); // Clear the new note input
    };

    if (!loan) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Loan Details</h1>
            <p>Borrower Name: {loan.borrowerName}</p>
            <p>Loan Amount: ${loan.loanAmount}</p>
            <p>Amount Paid: ${loan.amountPaid}</p>
            <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
            <p>Status: {loan.status}</p>
            <button onClick={() => updateStatus('paid')}>Mark as Paid</button>
            <button onClick={() => updateStatus('partially paid')}>Mark as Partially Paid</button>
            <button onClick={() => updateStatus('unpaid')}>Mark as Unpaid</button>
            <h3>Notes</h3>
            {loan.notes ? (
                <div>
                    <p>{loan.notes}</p>
                    <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
                </div>
            ) : (
                <div>
                    <textarea
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button onClick={saveNotes}>Save Notes</button>
                </div>
            )}
            {isEditing && loan.notes && (
                <div>
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button onClick={saveNotes}>Save Notes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default LoanDetails;
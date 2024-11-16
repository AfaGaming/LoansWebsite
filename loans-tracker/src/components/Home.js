import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await axios.get('http://localhost:5000/loans');
            setLoans(response.data);
        };
        fetchLoans();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Loan Tracker</h1>
            <Link to="/add-loan">
                <button style={{ marginBottom: '20px' }}>Add New Loan</button>
            </Link>
            <div className="loan-list">
                {loans.map((loan) => (
                    <div key={loan._id} className="loan-card">
                        <Link to={`/loan/${loan._id}`}>
                            <h2>{loan.borrowerName}</h2>
                            <p>Loan Amount: ${loan.loanAmount}</p>
                            <p>Status: {loan.status}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
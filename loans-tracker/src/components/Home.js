import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import custom CSS
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon

const HomePage = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            const response = await axios.get('http://localhost:5000/loans');
            setLoans(response.data);
        };
        fetchLoans();
    }, []);

    return (
        <div className="home-container">
            <h1 className="text-center">Loan Items</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {loans.map((loan) => (
                    <Col key={loan._id}>
                        <Card className="loan-card">
                            <Card.Body>
                                <Card.Title>{loan.borrowerName}</Card.Title>
                                <Card.Text>
                                    <strong>Loan Amount:</strong> ${loan.loanAmount}<br />
                                    <strong>Status:</strong> {loan.status}
                                </Card.Text>
                                <Link to={`/loans/${loan._id}`} className="btn btn-primary">View Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {/* Add Loan Card */}
                <Col>
                    <Card className="add-loan-card text-center">
                        <Card.Body>
                            <Link to="/add-loan" className="add-icon-link">
                                <FaPlus size={50} className="add-icon" />
                            </Link>
                            <Card.Title>Add Loan</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
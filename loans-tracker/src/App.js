import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddLoan from './components/AddLoan';
import LoanDetails from './components/LoanDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-loan" element={<AddLoan />} />
                <Route path="/loan/:id" element={<LoanDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
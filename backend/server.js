const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://afa123:afa123@cluster0.zmbug.mongodb.net/loandb?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const loanSchema = new mongoose.Schema({
    borrowerName: String,
    loanAmount: Number,
    amountPaid: { type: Number, default: 0 },
    dueDate: Date,
    status: { type: String, enum: ['paid', 'unpaid', 'partially paid'], default: 'unpaid' },
    notes: { type: [String], default: [] }, // Change notes to an array of strings
});

const Loan = mongoose.model('Loan', loanSchema);

// Existing routes...

app.get('/loans', async (req, res) => {
    const loans = await Loan.find();
    res.json(loans);
});

app.post('/loans', async (req, res) => {
    const newLoan = new Loan(req.body);
    await newLoan.save();
    res.json(newLoan);
});

app.get('/loans/:id', async (req, res) => {
    const loanId = req.params.id;
    const loan = await Loan.findById(loanId);
    if (!loan) {
        return res.status(404).send('Loan not found');
    }
    res.json(loan);
});

// Route to add a note
app.post('/loans/:id/note', async (req, res) => {
    const loanId = req.params.id;
    const { note } = req.body; // Expecting a note in the request body

    const loan = await Loan.findById(loanId);
    if (!loan) {
        return res.status(404).send('Loan not found');
    }

    loan.notes = note; // Update the notes field with the new note
    await loan.save(); // Save the updated loan document

    res.json(loan); // Return the updated loan
});

// Existing route to update loan status
app.put('/loans/:id', async (req, res) => {
    const loanId = req.params.id;
    const { status } = req.body;

    const loan = await Loan.findByIdAndUpdate(loanId, { status }, { new: true });
    if (!loan) {
        return res.status(404).send('Loan not found');
    }
    res.json(loan);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
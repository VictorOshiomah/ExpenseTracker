const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json())

app.use(bodyParser.json());
app.use(cors());
const filePath = path.join(__dirname, "expenses.json");

// import { Expense } from "./Expense";

interface Expense {
  id: number;
  date: string;
  amount: string;
  category: string;
  method: string;
}

let expenseList: Expense[] = [];

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error("Unable to read file: " + filePath);
  } expenseList = JSON.parse(data)
});

const port = 3000;

app.get('/', (req, res) => {
  res.status(200);
  return res.json(expenseList);
})

app.get('/:id', (req, res) => {
  const expense = expenseList.find(c => c.id == req.params.id);
  if (expense) {
    res.status(200);
    return res.json(expense);
  }
  return res.status(400).json({ error: `Expense with id: ${req.params.id} not found` })

});

app.post('/', (req, res) => {
  const newExpense = req.body;
  if (!newExpense || !newExpense.id || !newExpense.date || !newExpense.amount || !newExpense.category || !newExpense.method) {
    return res.json({ error: "All of the fields are not compete." })
  }
  console.log(`body is ${JSON.stringify(req.body)}`);
  expenseList.push(newExpense);
  return res.status(201).json(newExpense);
});

app.put('/:id', function (req, res) {
  const { id, date, amount, category, method } = req.body;
  const expense = expenseList.findIndex(c => c.id == id);
  expenseList[expense] = { ...expenseList[expense], date, amount, category, method };
  return res.status(200).json(expenseList[expense]);
});

app.delete('/:id', function (req, res) {
  const { id } = req.params;
  const person = expenseList.findIndex(c => c.id == id);
  expenseList.splice(person, 1);
  return res.status(200).send(`Delete record with id ${id}`);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`)
});


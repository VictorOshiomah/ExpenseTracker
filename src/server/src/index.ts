import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const filePath = path.join(__dirname, 'expenses.json');

export interface Expense {
  id: number;
  date: string;
  amount: number;
  category: string;
  method: string;
}

let expenseList: Expense[] = [];

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Unable to read file: ' + filePath);
  } else {
    expenseList = JSON.parse(data.toString());
  }
});

const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json(expenseList);
});

app.get('/:id', (req, res) => {
  const expense = expenseList.find((c) => c.id == parseInt(req.params.id));
  if (expense) {
    return res.status(200).json(expense);
  } else {
    return res
      .status(404)
      .json({ error: `Expense with id: ${req.params.id} not found` });
  }
});

app.post('/', (req, res) => {
  const newExpense = req.body;
  if (
    !newExpense ||
    // !newExpense.id ||
    !newExpense.date ||
    !newExpense.amount ||
    !newExpense.category ||
    !newExpense.method
  ) {
    return res.json({ error: 'All of the fields are not compete.' });
  }
  console.log(`body is ${JSON.stringify(req.body)}`);

  const maxId = expenseList.reduce((max, expense) => {
    return expense.id > max ? expense.id : max;
  }, 0);

  const newId = maxId + 1;
  expenseList.push({ ...newExpense, id: newId });
  return res.status(201).json(newExpense);
});

app.put('/:id', (req, res) => {
  const { id, date, amount, category, method } = req.body;
  const expense = expenseList.findIndex((c) => c.id == id);
  expenseList[expense] = {
    ...expenseList[expense],
    date,
    amount,
    category,
    method,
  };
  return res.status(200).json(expenseList[expense]);
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const person = expenseList.findIndex((c) => c.id == parseInt(id));
  expenseList.splice(person, 1);
  return res.status(200).send(`Delete record with id ${id}`);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

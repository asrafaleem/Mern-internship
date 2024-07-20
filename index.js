require("./db");
const express = require('express');
const bodyParser = require('body-parser');
const Account = require('./account'); // Ensure 'Account' matches the model name

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Read CRUD
app.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create CRUD
app.post('/insert', async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).send(error);
  }
});
// delete crud
app.delete('/delete/:accountno', async (req, res) => {
  try {
    const accountNo = req.params.accountno;
    const result = await Account.findOneAndDelete({ accountno: accountNo });
    if (result) {
      res.status(200).json({ message: 'Account deleted successfully', result });
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//update
app.put('/update/:accountno', async (req, res) => {
  try {
    const accountNo = req.params.accountno;
    const update = { accountbal: req.body.accountbal };
    const result = await Account.findOneAndUpdate({ accountno: accountNo }, update, { new: true });
    if (result) {
      res.status(200).json({ message: 'Account balance updated successfully', result });
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// Server Listening on Port 1234
app.listen(1234, () => {
  console.log('account initiated!!!!!!!!!!!!!!!!');
});

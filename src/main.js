const express = require('express');
const validate = require('validate.js');
const fs = require('fs');

const app = express();

const saveInFile = async (email) => {
    console.log(email);
}

const emailValidation = (req, res) => {
    const { login } = req.params;
    if (!login){
        res.send(400).send(`message not received`);
        return;
    }

    let validation = validate({this: `${login}`}, constraints);

    console.log(login);
    if(!validation){
        return res.status(200).send(login);
    }
    return res.status(400).send(validation.this);
}

var constraints = {
    this: {
      email: true
    }
};

app.get('/', (req, res) => {
    res.status(200).send('ok')
});

app.get('/SalvarLogin/:login', (req, res) => {
    const { login } = req.params;
    saveInFile(login);
    res.status(200).send(login);
});

app.get('/:login', (req, res) => {
    emailValidation(req, res);
});

app.post('/:login', (req, res) => {
    emailValidation(req, res);
});

app.listen(9999, () => {
    console.log('Hello World');
});
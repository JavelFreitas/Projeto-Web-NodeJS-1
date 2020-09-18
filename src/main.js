const express = require('express');
const validate = require('validate.js');
const fs = require('fs');
const axios = require('axios');

const app = express();

const saveInFile = async (email, fileName) => {
    console.log(email);
    console.log(fileName);
    fs.appendFile(fileName, email + '\n', err =>{
        if (err) {
            console.error(err)
            return;
        }
    });
}

const saveDogInFile = async (dogURL, fileName) => {
    fs.appendFile(fileName, dogURL + '\n', err =>{
        if (err) {
            console.error(err)
            return;
        }
    });
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
    res.status(200).send('Accepting requisitions');
});

app.get('/SalvarLogin/:login', (req, res) => {
    let fileName = 'database/EmailList.txt';
    const { login } = req.params;
    saveInFile(login, fileName);
    res.status(200).send(login);
});

app.get('/:login', (req, res) => {
    emailValidation(req, res);
});

app.post('/:login', (req, res) => {
    emailValidation(req, res);
});

app.post('/dog/random', async (req, res) => {
    let fileName = 'database/DogURL.txt';
    let { data: { message } } = await axios.get('https://dog.ceo/api/breeds/image/random');
    
    console.log(message);
    saveDogInFile(message, fileName);

    let response = `<img src="${message}" >`;
    res.status(200).send(response);
});

app.listen(9999, () => {
    console.log('Hello World');
});
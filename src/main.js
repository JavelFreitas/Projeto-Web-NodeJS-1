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

const emailValidation = (login) => {
    
    if (!login){
        return {status: 400, message: `message not received`};
    }

    let validation = validate({this: `${login}`}, constraints);

    console.log(login);
    if(!validation){
        return {status: 200, message: login};
    }
    
    let thism = validation.this;
    return {status: 400, message: thism};
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
    let { login } = req.params;

    let {status} = emailValidation(login);
    
    if(status != 200){
        login += ' (Email incorreto)';
    }

    saveInFile(login, fileName);
    res.status(200).send(login);
});

app.get('/:login', (req, res) => {
    const { login } = req.params;
    let {status, message} = emailValidation(login);
    res.status(status).send(message);
});

app.post('/', (req, res) => {
    
    if(!req.query){
        res.status(400).send('Query Needed');
    }

    const { login } = req.query;
    let {status, message} = emailValidation(login);
    res.status(status).send(message);
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
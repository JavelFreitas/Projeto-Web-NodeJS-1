const express = require('express');
const fs = require('fs');

const app = express();

const saveInFile = async (email) => {
    console.log(email);
}

app.get('', (error, req, body) => {
    if (error) {
        console.error(error)
        return
    }
    const { login } = req.params;
    console.log(body);
    console.log(req);
    res.status(200).send(login)
});

app.get('/SalvarLogin/:login', (req, res) => {
    const { login } = req.params;
    saveInFile(login);
    res.status(200).send(login);
});

app.listen(9999, () => {
    console.log('Hello World');
});
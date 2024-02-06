const express = require('express');
const request = require('request');
const app = express();

let database = [];
let skor = {};

app.get('/game1/:idsoal', (req, res) => {
    request('https://rest-api.akuari.my.id/games/tebakkata', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            database.push(data.hasil);
            res.json(data.hasil);
        }
    });
});

app.get('/game2/:idsoal', (req, res) => {
    request('https://rest-api.akuari.my.id/games/susunkata', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            database.push(data.hasil);
            res.json(data.hasil);
        }
    });
});

app.get('/jawab/:user', (req, res) => {
    let user = req.params.user;
    let jawaban = req.query.jawaban;
    let idsoal = req.query.idsoal;

    let soal = database.find(soal => soal.index == idsoal);
    if (soal) {
        if (soal.jawaban == jawaban) {
            skor[user] = (skor[user] || 0) + 3;
        } else {
            skor[user] = (skor[user] || 0) - 1;
        }
        database = database.filter(soal => soal.index != idsoal);
    }
    res.json({ skor: skor[user] });
});

app.get('/skor', (req, res) => {
    let user = req.query.user;
    res.json({ skor: skor[user] });
});

app.get('/topskor', (req, res) => {
    let topskor = Object.keys(skor).reduce((a, b) => skor[a] > skor[b] ? a : b);
    res.json({ user: topskor, skor: skor[topskor] });
});

app.listen(3000, () => console.log('Server berjalan di port 3000'));

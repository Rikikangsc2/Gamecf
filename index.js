const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

let database = [];

app.get('/game1/:idsoal', (req, res) => {
  const idSoal = req.params.idsoal;
  request.get('https://rest-api.akuari.my.id/games/tebakkata', (error, response, body) => {
    const gameData = JSON.parse(body);
    const game = gameData.hasil;
    database.push({ idSoal, game });
    res.send(`Game 1 dimulai dengan soal: ${game.soal}`);
  });
});

app.get('/game2/:idsoal', (req, res) => {
  const idSoal = req.params.idsoal;
  request.get('https://rest-api.akuari.my.id/games/susunkata', (error, response, body) => {
    const gameData = JSON.parse(body);
    const game = gameData.hasil;
    database.push({ idSoal, game });
    res.send(`Game 2 dimulai dengan soal: ${game.soal}`);
  });
});

app.get('/jawab/:user', (req, res) => {
  const user = req.params.user;
  const jawaban = req.query.jawaban;
  const idSoal = req.query.idsoal;
  const gameIndex = database.findIndex((game) => game.idSoal === idSoal);
  const game = database[gameIndex].game;
  let response = '';

  if (game.jawaban === jawaban) {
    response = `Jawaban ${user} benar! Anda mendapatkan 3 poin.`;
  } else {
    response = `Jawaban ${user} salah! Anda kehilangan 1 poin.`;
  }

  database.splice(gameIndex, 1);
  res.send(response);
});

app.get('/skor', (req, res) => {
  const user = req.query.user;
  const userGames = database.filter((game) => game.user === user);
  let totalPoints = 0;

  for (let i = 0; i < userGames.length; i++) {
    const game = userGames[i].game;
    totalPoints += game.jawaban === 'benar' ? 3 : -1;
  }

  res.send(`Skor ${user}: ${totalPoints}`);
});

app.get('/topskor', (req, res) => {
  const sortedDatabase = database.sort((a, b) => {
    const pointsA = a.game.jawaban === 'benar' ? 3 : -1;
    const pointsB = b.game.jawaban === 'benar' ? 3 : -1;
    return pointsB - pointsA;
  });

  let response = 'Top Skor:\n\n';
  for (let i = 0; i < sortedDatabase.length; i++) {
    const game = sortedDatabase[i].game;
    response += `${i + 1}. ${game.user}: ${game.jawaban === 'benar' ? 3 : -1} poin\n`;
  }

  res.send(response);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

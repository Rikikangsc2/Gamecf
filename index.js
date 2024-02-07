const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

const games = {
  game1: {
    url: 'https://rest-api.akuari.my.id/games/tebakkata',
    currentQuestion: {},
    answeredQuestions: {},
  },
  game2: {
    url: 'https://rest-api.akuari.my.id/games/susunkata',
    currentQuestion: {},
    answeredQuestions: {},
  },
};

const users = {};

app.get('/game1/:iduser', (req, res) => {
  const iduser = req.params.iduser;

  if (!users[iduser]) {
    users[iduser] = { score: 0, attempts: 3 };
    getNewQuestion('game1', iduser, res);
  } else {
    res.send('Kamu sudah punya soal belum selesai! 😅');
  }
});

app.get('/game2/:iduser', (req, res) => {
  const iduser = req.params.iduser;

  if (!users[iduser]) {
    users[iduser] = { score: 0, attempts: 3 };
    getNewQuestion('game2', iduser, res);
  } else {
    res.send('Kamu sudah punya soal belum selesai! 😅');
  }
});

app.get('/aturan', (req, res) => {
  res.send('Aturan game:\n- Setiap game memiliki 3 kesempatan menjawab.\n- Jika berhasil, kamu mendapatkan 3 poin.\n- Jangan mengambil soal baru jika soalmu belum selesai. 😊');
});

app.get('/jawab/:user', (req, res) => {
  const { jawaban, iduser } = req.query;
  const game = users[iduser].currentGame;

  if (!jawaban || !iduser || !game) {
    res.send('Parameter tidak lengkap! 😕');
    return;
  }

  if (users[iduser].attempts > 0) {
    if (jawaban.toLowerCase() === users[iduser].currentQuestion.hasil.jawaban.toLowerCase()) {
      users[iduser].score += 3;
      users[iduser].attempts = 0;
      deleteQuestion(game, iduser);
      res.send('Selamat! Jawaban benar! 🎉');
    } else {
      users[iduser].attempts--;
      res.send(`Jawaban salah! Sisa kesempatan: ${users[iduser].attempts} 😕`);
    }
  } else {
    res.send('Maaf, kesempatanmu sudah habis! 😅');
  }
});

app.get('/skor', (req, res) => {
  const iduser = req.query.user;
  if (users[iduser]) {
    res.send(`Skormu saat ini: ${users[iduser].score} poin. 😊`);
  } else {
    res.send('ID pengguna tidak valid! 😕');
  }
});

app.get('/topskor', (req, res) => {
  const topUsers = Object.entries(users).sort((a, b) => b[1].score - a[1].score).slice(0, 5);
  const topScores = topUsers.map(user => `${user[0]}: ${user[1].score} poin`);
  res.send(`Top 5 skor:\n${topScores.join('\n')}`);
});

function getNewQuestion(game, iduser, res) {
  request(games[game].url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const question = JSON.parse(body);
      games[game].currentQuestion[iduser] = question;
      users[iduser].currentGame = game;
      res.send(`Berikut soalmu: ${question.hasil.soal} 😊`);
    } else {
      res.send('Gagal mengambil soal. Coba lagi nanti! 😕');
    }
  });
}

function deleteQuestion(game, iduser) {
  const question = games[game].currentQuestion[iduser];
  games[game].answeredQuestions[iduser] = question;
  delete games[game].currentQuestion[iduser];
}

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
    

const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

let tebakkataSoal = null;
let susunkataSoal = null;
let jawabanCount = {};
let db = [];

app.get("/db", async ( req, res ) => {
  if (!req.query.item) return res.send("masukan item")
if (db.includes(req.query.item)) return res.json(db)
 await db.push(req.query.item);
  res.json(db)
});

// Endpoint untuk menampilkan aturan game
app.get('/aturan', (req, res) => {
  res.send("🎮 Selamat datang di Game API!\n\nKamu bisa main dua game:\n1. Tebak Kata\n2. Susun Kata\n\nSetiap jawaban benar akan mendapatkan 3 poin!\nKamu punya 3 kesempatan untuk menjawab setiap soal.\n\nSemangat! 😊");
});

// Endpoint untuk mendapatkan soal tebak kata
app.get('/tebakkata/:idsoal', (req, res) => {
  const idsoal = req.params.idsoal;
  if (tebakkataSoal && tebakkataSoal.index === idsoal) {
    res.send("Kamu sudah punya soal tebak kata yang sedang berjalan! Coba jawab dulu itu. 😉");
  } else {
    request('https://rest-api.akuari.my.id/games/tebakkata', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        tebakkataSoal = JSON.parse(body).hasil;
        tebakkataSoal.index = idsoal;
        res.send(`Ini soalmu: ${tebakkataSoal.soal}`);
      } else {
        res.send("Maaf, ada masalah saat mengambil soal. Coba lagi nanti ya! 😅");
      }
    });
  }
});

// Endpoint untuk mendapatkan soal susun kata
app.get('/susunkata/:idsoal', (req, res) => {
  const idsoal = req.params.idsoal;
  if (susunkataSoal && susunkataSoal.index === idsoal) {
    res.send("Kamu sudah punya soal susun kata yang sedang berjalan! Coba jawab dulu itu. 😉");
  } else {
    request('https://rest-api.akuari.my.id/games/susunkata', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        susunkataSoal = JSON.parse(body).hasil;
        susunkataSoal.index = idsoal;
        res.send(`Coba susun kata ini: ${susunkataSoal.soal}`);
      } else {
        res.send("Maaf, ada masalah saat mengambil soal. Coba lagi nanti ya! 😅");
      }
    });
  }
});

// Endpoint untuk menerima jawaban dari user
app.get('/jawab/:user', (req, res) => {
  const user = req.params.user;
  const jawaban = req.query.jawaban;
  const idsoal = req.query.idsoal;

  if (!jawabanCount[user]) {
    jawabanCount[user] = 1;
  } else {
    jawabanCount[user]++;
  }

  if (jawabanCount[user] > 3) {
    res.send("Game sudah selesai, kamu sudah melebihi kesempatan menjawab! 😅");
  } else {
    if (tebakkataSoal && tebakkataSoal.index === idsoal) {
      if (jawaban.toLowerCase() === tebakkataSoal.jawaban.toLowerCase()) {
        tebakkataSoal = null;
        res.send("Jawaban benar! Kamu mendapatkan 3 poin. 🎉");
      } else {
        res.send("Jawaban salah! Coba lagi ya. 😕");
      }
    } else if (susunkataSoal && susunkataSoal.index === idsoal) {
      if (jawaban.toLowerCase() === susunkataSoal.jawaban.toLowerCase()) {
        susunkataSoal = null;
        res.send("Jawaban benar! Kamu mendapatkan 3 poin. 🎉");
      } else {
        res.send("Jawaban salah! Coba lagi ya. 😕");
      }
    } else {
      res.send("Maaf, tidak ada soal dengan ID tersebut atau soal sudah dijawab sebelumnya. 😅");
    }
  }
});

// Endpoint untuk melihat skor user
app.get('/skor', (req, res) => {
  const user = req.query.user;
  const skor = jawabanCount[user] ? jawabanCount[user] * 3 : 0;
  res.send(`Skor ${user}: ${skor} poin.`);
});

// Endpoint untuk melihat top skor
app.get('/topskor', (req, res) => {
  const topSkor = Object.entries(jawabanCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
  let topSkorMsg = "Top Skor:\n";
  topSkor.forEach((entry, index) => {
    topSkorMsg += `${index + 1}. ${entry[0]} - ${entry[1] * 3} poin\n`;
  });
  res.send(topSkorMsg);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
      

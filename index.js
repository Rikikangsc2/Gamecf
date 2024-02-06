// Buat aplikasi express
const express = require('express');
const app = express();

// Buat modul request untuk mengambil data dari api
const request = require('request');

// Buat objek untuk menyimpan skor dan soal user
let skor = {};
let soal = {};

// Buat fungsi untuk mengambil soal dari api
function getSoal(api, callback) {
  request(api, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      let data = JSON.parse(body);
      callback(null, data.hasil);
    }
  });
}

// Buat endpoint /game1 untuk game tebak kata
app.get('/game1', (req, res) => {
  // Ambil soal dari api
  getSoal('https://rest-api.akuari.my.id/games/tebakkata', (error, data) => {
    if (error) {
      res.status(500).send('Terjadi kesalahan saat mengambil soal');
    } else {
      // Simpan soal dan jawaban ke objek soal
      soal.game1 = data;
      // Kirim soal ke user
      res.send(`Soal: ${data.soal}`);
    }
  });
});

// Buat endpoint /game2 untuk game susun kata
app.get('/game2', (req, res) => {
  // Ambil soal dari api
  getSoal('https://rest-api.akuari.my.id/games/susunkata', (error, data) => {
    if (error) {
      res.status(500).send('Terjadi kesalahan saat mengambil soal');
    } else {
      // Simpan soal dan jawaban ke objek soal
      soal.game2 = data;
      // Kirim soal ke user
      res.send(`Soal: ${data.soal}\nTipe: ${data.tipe}`);
    }
  });
});

// Buat endpoint /jawab/:user?jawaban= untuk user menjawab soal
app.get('/jawab/:user', (req, res) => {
  // Ambil nama user dan jawaban dari parameter
  let user = req.params.user;
  let jawaban = req.query.jawaban;

  // Cek apakah user sudah ada di objek skor
  if (!skor[user]) {
    // Jika belum, buat properti baru dengan nilai 0
    skor[user] = 0;
  }

  // Cek apakah user sudah mendapatkan soal
  if (soal.game1 || soal.game2) {
    // Jika ya, cek apakah jawaban user benar
    if (jawaban === soal.game1.jawaban || jawaban === soal.game2.jawaban) {
      // Jika benar, tambahkan skor user 3 poin
      skor[user] += 3;
      // Hapus soal yang sudah dijawab
      soal.game1 = null;
      soal.game2 = null;
      // Kirim pesan ke user
      res.send(`Selamat, jawaban Anda benar!\nSkor Anda: ${skor[user]}`);
    } else {
      // Jika salah, kurangi skor user 1 poin
      skor[user] -= 1;
      // Kirim pesan ke user
      res.send(`Maaf, jawaban Anda salah.\nSkor Anda: ${skor[user]}`);
    }
  } else {
    // Jika tidak, kirim pesan ke user
    res.send('Anda belum mendapatkan soal.');
  }
});

// Buat endpoint /skor?user= untuk user melihat skor mereka
app.get('/skor', (req, res) => {
  // Ambil nama user dari query
  let user = req.query.user;

  // Cek apakah user sudah ada di objek skor
  if (skor[user]) {
    // Jika ya, kirim skor user
    res.send(`Skor Anda: ${skor[user]}`);
  } else {
    // Jika tidak, kirim pesan ke user
    res.send('Anda belum bermain.');
  }
});

// Buat endpoint /topskor untuk user melihat 10 skor tertinggi
app.get('/topskor', (req, res) => {
  // Buat array untuk menyimpan nama dan skor user
  let topskor = [];

  // Looping objek skor
  for (let user in skor) {
    // Masukkan nama dan skor user ke array
    topskor.push({ user: user, skor: skor[user] });
  }

  // Urutkan array berdasarkan skor tertinggi
  topskor.sort((a, b) => b.skor - a.skor);

  // Ambil 10 elemen pertama dari array
  topskor = topskor.slice(0, 10);

  // Buat string untuk menampilkan topskor
  let output = 'Top 10 Skor:\n';

  // Looping array topskor
  for (let i = 0; i < topskor.length; i++) {
    // Tambahkan nama dan skor user ke string output
    output += `${i + 1}. ${topskor[i].user}: ${topskor[i].skor}\n`;
  }

  // Kirim string output ke user
  res.send(output);
});

// Jalankan aplikasi di port 3000
app.listen(3000, () => {
  console.log('Aplikasi berjalan di http://localhost:3000');
});

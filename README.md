# Dokumentasi REST API

## Gambaran Umum

Selamat datang di dokumentasi REST API! API ini menyediakan akses ke beberapa fitur permainan seru. Pastikan Anda mengikuti petunjuk dengan benar untuk memastikan integrasi yang lancar.

**URL Base API:** `gamecf.vercel.app`

## Endpoint

### 1. Game 1

#### a. Mulai Game 1
**Endpoint:** `/game1/:iduser`
- **Metode:** `GET`
- **Deskripsi:** Memulai Game 1 untuk pengguna dengan `iduser` tertentu.
- **Contoh:** `/game1/123`

#### b. Jawab Soal Game 1
**Endpoint:** `/jawab/:user`
- **Metode:** `GET`
- **Deskripsi:** Memberikan jawaban untuk soal Game 1.
- **Parameter Query:**
  - `jawaban` (string): Jawaban dari pengguna.
  - `iduser` (string): ID pengguna yang sedang bermain.
- **Contoh:** `/jawab/123?jawaban=KABEL&iduser=456`

### 2. Game 2

#### a. Mulai Game 2
**Endpoint:** `/game2/:iduser`
- **Metode:** `GET`
- **Deskripsi:** Memulai Game 2 untuk pengguna dengan `iduser` tertentu.
- **Contoh:** `/game2/456`

#### b. Jawab Soal Game 2
**Endpoint:** `/jawab/:user`
- **Metode:** `GET`
- **Deskripsi:** Memberikan jawaban untuk soal Game 2.
- **Parameter Query:**
  - `jawaban` (string): Jawaban dari pengguna.
  - `iduser` (string): ID pengguna yang sedang bermain.
- **Contoh:** `/jawab/456?jawaban=LUKISAN&iduser=789`

### 3. Aturan Game

**Endpoint:** `/aturan`
- **Metode:** `GET`
- **Deskripsi:** Menampilkan aturan umum untuk permainan.
- **Contoh:** `/aturan`

### 4. Skor Pengguna

**Endpoint:** `/skor`
- **Metode:** `GET`
- **Deskripsi:** Menampilkan skor pengguna berdasarkan ID pengguna.
- **Parameter Query:**
  - `user` (string): ID pengguna.
- **Contoh:** `/skor?user=123`

### 5. Top Skor

**Endpoint:** `/topskor`
- **Metode:** `GET`
- **Deskripsi:** Menampilkan top 5 skor pengguna.
- **Contoh:** `/topskor`

## Status Kode Respon Umum

- **200 OK:** Permintaan berhasil.
- **400 Bad Request:** Parameter tidak lengkap atau tidak valid.
- **404 Not Found:** Endpoint tidak ditemukan.
- **500 Internal Server Error:** Terjadi kesalahan server.

## Catatan Penting

- Setiap pengguna memiliki 3 kesempatan untuk menjawab setiap permainan.
- Jangan mengambil soal baru jika soal sebelumnya belum diselesaikan.
- Skor dihitung berdasarkan jawaban benar, dan setiap jawaban benar mendapatkan 3 poin.

Terima kasih telah menggunakan API kami! Jika ada pertanyaan atau masukan, jangan ragu untuk menghubungi tim dukungan kami. 😊

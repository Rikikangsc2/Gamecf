# Dokumentasi REST API Game

## Deskripsi
REST API ini menyediakan layanan untuk permainan tebak kata dan susun kata. Pemain dapat mengakses soal, menjawab, dan melihat skor mereka.

## Base URL
https://gamecf.vercel.app/

## Endpoints

### 1. **GET /game1/:idsoal**
   - **Deskripsi:** Mendapatkan soal untuk permainan tebak kata.
   - **Parameter:**
     - `idsoal` (Path) - ID unik soal.
   - **Contoh Penggunaan:**
     - `/game1/123`
   - **Response:**
     - Data soal dalam format JSON.

### 2. **GET /game2/:idsoal**
   - **Deskripsi:** Mendapatkan soal untuk permainan susun kata.
   - **Parameter:**
     - `idsoal` (Path) - ID unik soal.
   - **Contoh Penggunaan:**
     - `/game2/456`
   - **Response:**
     - Data soal dalam format JSON.

### 3. **GET /jawab/:user**
   - **Deskripsi:** Memproses jawaban pemain dan menghitung skor.
   - **Parameter:**
     - `user` (Path) - Nama pengguna pemain.
     - `jawaban` (Query) - Jawaban dari pemain.
     - `idsoal` (Query) - ID unik soal yang dijawab.
   - **Contoh Penggunaan:**
     - `/jawab/player123?jawaban=tebak&idsoal=123`
   - **Response:**
     - Skor pemain dalam format JSON.

### 4. **GET /skor**
   - **Deskripsi:** Mendapatkan skor pemain berdasarkan nama pengguna.
   - **Parameter:**
     - `user` (Query) - Nama pengguna pemain.
   - **Contoh Penggunaan:**
     - `/skor?user=player123`
   - **Response:**
     - Skor pemain dalam format JSON.

### 5. **GET /topskor**
   - **Deskripsi:** Mendapatkan pemain dengan skor tertinggi.
   - **Contoh Penggunaan:**
     - `/topskor`
   - **Response:**
     - Pengguna dengan skor tertinggi dalam format JSON.

## Catatan Penting
- Server berjalan di port 3000.
- Pastikan untuk menjalankan server sebelum memulai permainan.
- Gunakan endpoint `/topskor` untuk melihat pemain dengan skor tertinggi.

Terima kasih telah menggunakan REST API Game ini! Jika ada pertanyaan atau masukan, jangan ragu untuk menghubungi kami.

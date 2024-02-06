**Dokumentasi REST API GameCF**

**Base URL:** `https://gamecf.vercel.app/`

### 1. Mulai Game 1
- **Endpoint:** `/game1/:idsoal`
- **Metode:** GET
- **Deskripsi:** Memulai Game 1 dengan mendapatkan soal dari https://rest-api.akuari.my.id/games/tebakkata. Menyimpan data game ke database.
- **Contoh Permintaan:** `https://gamecf.vercel.app/game1/123`
- **Contoh Respons:** `Game 1 dimulai dengan soal: [soal]`

### 2. Mulai Game 2
- **Endpoint:** `/game2/:idsoal`
- **Metode:** GET
- **Deskripsi:** Memulai Game 2 dengan mendapatkan soal dari https://rest-api.akuari.my.id/games/susunkata. Menyimpan data game ke database.
- **Contoh Permintaan:** `https://gamecf.vercel.app/game2/456`
- **Contoh Respons:** `Game 2 dimulai dengan soal: [soal]`

### 3. Jawab Soal
- **Endpoint:** `/jawab/:user`
- **Metode:** GET
- **Deskripsi:** Memeriksa jawaban pengguna terhadap suatu soal. Memberikan poin berdasarkan kebenaran jawaban.
- **Contoh Permintaan:** `https://gamecf.vercel.app/jawab/john?jawaban=tebakan&idsoal=123`
- **Contoh Respons:** `Jawaban john benar! Anda mendapatkan 3 poin.`

### 4. Skor Pengguna
- **Endpoint:** `/skor`
- **Metode:** GET
- **Deskripsi:** Mengembalikan skor total pengguna berdasarkan permainan yang diikuti.
- **Contoh Permintaan:** `https://gamecf.vercel.app/skor?user=john`
- **Contoh Respons:** `Skor john: 6`

### 5. Top Skor
- **Endpoint:** `/topskor`
- **Metode:** GET
- **Deskripsi:** Mengembalikan daftar top skor pengguna beserta poin mereka.
- **Contoh Permintaan:** `https://gamecf.vercel.app/topskor`
- **Contoh Respons:**
  ```
  Top Skor:

  1. john: 6 poin
  2. jane: 3 poin
  3. bob: -1 poin
  ```
  
**Catatan:** Pastikan untuk mengganti `[soal]` dengan soal yang sebenarnya dan menyesuaikan parameter dan respons sesuai kebutuhan aplikasi.

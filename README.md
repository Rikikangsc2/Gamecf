**Dokumentasi REST API Game CF**

Base URL: `https://gamecf.vercel.app/`

### 1. Endpoint `/game1`

- **Metode**: GET
- **Deskripsi**: Endpoint untuk mendapatkan soal game tebak kata.
- **Contoh Penggunaan**: `https://gamecf.vercel.app/game1`
- **Respons**: Menampilkan soal tebak kata dari API.

### 2. Endpoint `/game2`

- **Metode**: GET
- **Deskripsi**: Endpoint untuk mendapatkan soal game susun kata.
- **Contoh Penggunaan**: `https://gamecf.vercel.app/game2`
- **Respons**: Menampilkan soal susun kata dan tipe soal dari API.

### 3. Endpoint `/jawab/:user?jawaban=`

- **Metode**: GET
- **Deskripsi**: Endpoint untuk user menjawab soal.
- **Parameter**: 
  - `user` (path parameter): Nama user.
  - `jawaban` (query parameter): Jawaban dari user.
- **Contoh Penggunaan**: `https://gamecf.vercel.app/jawab/johndoe?jawaban=kucing`
- **Respons**: Menampilkan pesan jawaban benar atau salah, beserta skor terkini.

### 4. Endpoint `/skor`

- **Metode**: GET
- **Deskripsi**: Endpoint untuk user melihat skornya.
- **Parameter**: 
  - `user` (query parameter): Nama user.
- **Contoh Penggunaan**: `https://gamecf.vercel.app/skor?user=johndoe`
- **Respons**: Menampilkan skor user atau pesan jika belum bermain.

### 5. Endpoint `/topskor`

- **Metode**: GET
- **Deskripsi**: Endpoint untuk user melihat 10 skor tertinggi.
- **Contoh Penggunaan**: `https://gamecf.vercel.app/topskor`
- **Respons**: Menampilkan top 10 skor beserta nama pengguna.

### Catatan Penting:

- Gunakan base URL `https://gamecf.vercel.app/` untuk mengakses semua endpoint.

Terima kasih telah menggunakan REST API Game CF!

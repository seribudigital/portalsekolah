# Instruksi Data Dummy & Akun Akses Awal

Tolong buatkan skrip otomatisasi atau fungsi 'Seed' untuk mengisi Firestore dengan data awal sebagai berikut agar sistem siap didemokan.

## 1. Akun Admin Utama (Authentication)
- **Email**: admin@alkhoir.sch.id
- **Password**: admin123
- **Role**: SUPER_ADMIN
- **Nama**: Administrator Al-Khoir
- **Tujuan**: User ini memiliki akses penuh ke seluruh data 4 tingkat (TK, SD, MTs, MA).

## 2. Struktur Data Siswa (Firestore Collection: `siswa`)
Buatlah total 520 dokumen siswa dengan aturan field sebagai berikut:
- **ID**: Auto-generated oleh Firestore.
- **Nama**: "Siswa [Kelas] [Rombel] - [No_Urut]" (Contoh: "Siswa 7 A - 05").
- **Status**: "AKTIF".
- **Unit & Rombel Detail**:

| Tingkat | Nama Kelas | Rombel | Jumlah Siswa |
| :--- | :--- | :--- | :--- |
| **TK** | TK A, TK B | A & B | 20 per rombel (Total 40) |
| **SD** | 1 s/d 6 | A & B | 20 per rombel (Total 240) |
| **MTs** | 7 s/d 9 | A & B | 20 per rombel (Total 120) |
| **MA** | 10 s/d 12 | A & B | 20 per rombel (Total 120) |

## 3. Logika Penempatan Data
- Pastikan field `unit` terisi (TK/SD/MTS/MA).
- Pastikan field `kelas` terisi (1, 2, 7, 10, dll).
- Pastikan field `rombel` terisi (A atau B).

## 4. Requirement UI Dashboard
Saat Admin login, dashboard harus bisa menghitung jumlah dokumen berdasarkan filter di atas:
- Menampilkan Card: "Total SD: 240 Siswa"
- Menampilkan Card: "Total MTs: 120 Siswa", dst.
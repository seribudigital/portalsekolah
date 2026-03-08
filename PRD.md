# Product Requirement Document (PRD) - Portal Madrasah Terpadu

## 1. Visi Produk
Membangun portal satu pintu untuk 4 jenjang pendidikan (TK, SD, MTs, MA) di bawah satu yayasan, fokus pada efisiensi administrasi (PPDB & Data Induk) serta publikasi kegiatan.

## 2. Pengguna & Hak Akses (RBAC)
- **Yayasan/Super Admin**: Akses penuh ke data 4 unit dan kontrol konten global.
- **Admin Unit (TK/SD/MTs/MA)**: Mengelola data siswa/guru dan konten berita hanya pada unitnya.
- **Guru**: Mengakses data referensi pengajaran (tahap awal: Read-only).

## 3. Fitur Utama (Fase 1)
- **Multi-Tenant Landing Page**: Landing page utama (Portal) dan sub-landing page per unit (TK/SD/MTs/MA).
- **Sistem PPDB Terpadu**: Form pendaftaran online dengan seleksi unit tujuan.
- **Manajemen Data Induk**: Dashboard untuk mengelola data Siswa dan Guru yang aktif.
- **CMS Kegiatan**: Integrasi Sanity.io untuk posting berita/pengumuman dengan sistem tagging unit.

## 4. Alur Kerja Utama (Logic Flow)
1. **PPDB**: Calon siswa isi form -> Masuk koleksi `ppdb` -> Admin Unit verifikasi -> Klik "Terima" -> Data pindah ke koleksi `siswa`.
2. **Konten**: Admin posting di Sanity -> Pilih Tag (Contoh: "MTS") -> Post muncul di portal utama DAN sub-page MTS.

## 5. Skalabilitas Masa Depan
Arsitektur harus mendukung penambahan:
- Modul Keuangan (SPP/Tabungan).
- Modul Akademik (LMS & Rapor Digital).
- Akun Orang Tua & Siswa.
# Panduan Konfigurasi Multi-School (Buku Panduan Admin)

Dokumen ini menjelaskan cara cepat menyesuaikan identitas sekolah (Logo, Nama, dan Tema Warna) saat melakukan deploy template *portal sekolah* ini untuk klien/sekolah baru.

## 1. Konfigurasi Dasar Sekolah
Semua konfigurasi utama terpusat di satu file: `src/config/site-config.ts`.

```typescript
// src/config/site-config.ts
export const siteConfig = {
    institutionName: "Al-Khoir Islamic School Bin Baz 5", // Nama lengkap sekolah
    shortName: "Al-Khoir", // Nama pendek atau singkatan
    colors: {
        primary: "#008000", // Warna utama (Utama portal)
        secondary: "#FFD700" // Warna sekunder (Portal)
    },
    units: ["TK", "SD", "MTS", "MA"] // Daftar unit sekolah
};
```

Ubah data di atas sesuai dengan nama dan identitas klien baru Anda.

## 2. Mengganti Tema Warna Per Unit (Dynamic Branding)
Jika sekolah klien memiliki warna yang berbeda untuk setiap unit (Misal: TK Merah, SD Hijau, dst), Anda dapat mengubahnya di file yang sama (`src/config/site-config.ts`) pada bagian `UNIT_THEMES`.

```typescript
// src/config/site-config.ts
export const UNIT_THEMES = {
  TK: { primary: '#FF69B4', accent: '#FFD700' }, // Contoh: TK menggunakan Pink & Emas
  SD: { primary: '#E31E24', accent: '#FFD700' }, // SD menggunakan Merah & Emas
  MTS: { primary: '#006400', accent: '#FFD700' }, 
  MA: { primary: '#1E3A8A', accent: '#FFD700' },  // MA menggunakan Biru Navy & Emas
};
```

**Penjelasan Warna:**
- `primary`: Warna dominan untuk unit tersebut (Background Header, Tombol, Link aktif).
- `accent`: Warna aksen/pelengkap (Border judul, garis navigasi).

*Catatan: Anda tidak perlu mengubah kode CSS atau komponen apapun. Perubahan di objek `UNIT_THEMES` ini akan otomatis mengubah seluruh tampilan tata letak halaman unit.*

## 3. Mengganti Logo Sekolah
Ada beberapa tempat utama untuk mengganti logo sekolah:
1. **Logo Utama (Navbar)**:
   Ganti file gambar di `public/logo.png` (atau format lain sesuai dengan implementasi komponen `<Header>`).
2. **Favicon (Ikon di tab browser)**:
   Ganti file `app/favicon.ico`. Anda juga dapat menggunakan file seperti `apple-touch-icon.png` atau ikon `.png` ukuran besar di dalam direktori `app`.
3. **Pola Background (Background Pattern)**:
   Ganti image `public/pattern.png` jika ingin memberikan tekstur atau background pattern yang berbeda untuk Hero Section di portal unit.

## 4. Akun Admin Default
Saat sistem baru di-deploy atau di-seed, terdapat beberapa akun dummy (*Role: ADMIN_UNIT*) yang disediakan untuk mempermudah pengetesan fitur admin terpisah antar unit. Akun-akun ini dapat dihapus atau diganti passwordnya melalui Firebase Console.

| Unit | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **TK** | `admin-tk@alkhoir.sch.id` | `admin123` | `ADMIN_UNIT` |
| **SD** | `admin-sd@alkhoir.sch.id` | `admin123` | `ADMIN_UNIT` |
| **MTS** | `admin-mts@alkhoir.sch.id` | `admin123` | `ADMIN_UNIT` |
| **MA** | `admin-ma@alkhoir.sch.id` | `admin123` | `ADMIN_UNIT` |

Semua akun di atas saat log in lewat halaman `/login` akan otomatis diarahkan ke `/admin/dashboard` yang **hanya menampilkan data statistik dan siswa milik unit tersebut** (Scoped RBAC). Akses pembuatan/manipulasi data ('*Tambah Siswa*', *Dropdown Unit*) juga secara otomatis dikunci (di-lock) untuk mencegah human-error lintas unit.

# Technical Architecture & Database Logic

## 1. Tech Stack
- **Framework**: Next.js (App Router)
- **Auth & Database**: Firebase (Auth & Firestore)
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS

## 2. Firestore Schema (NoSQL)

### Collection: `users`
- `uid`: string (Primary Key)
- `email`: string
- `displayName`: string
- `role`: "SUPER_ADMIN" | "ADMIN_UNIT" | "GURU"
- `unit`: "ALL" | "TK" | "SD" | "MTS" | "MA"

### Collection: `ppdb`
- `id`: string
- `namaLengkap`: string
- `unitTujuan`: "TK" | "SD" | "MTS" | "MA"
- `status`: "PENDING" | "ACCEPTED" | "REJECTED"
- `dataOrangTua`: map
- `createdAt`: timestamp

### Collection: `siswa` (Master Data)
- `id`: string
- `nisn`: string
- `namaLengkap`: string
- `unit`: "TK" | "SD" | "MTS" | "MA"
- `status`: "AKTIF" | "ALUMNI" | "MUTASI"

### Collection: `guru`
- `id`: string
- `nama`: string
- `unitTugas`: array ["MTS", "MA"] (Gunakan array untuk guru lintas unit)

## 3. Sanity.io Schema (Content)

### Document: `post`
- `title`: string
- `slug`: slug
- `mainImage`: image
- `content`: array (block content)
- `categories`: array of strings ["PORTAL", "TK", "SD", "MTS", "MA"]
- `publishedAt`: datetime

## 4. Routing Logic
- `/` -> Portal Utama (Filter Sanity: categories contains "PORTAL")
- `/[unit]` -> Landing Page Unit (Filter Sanity: categories contains "[unit]")
- `/admin/dashboard` -> Dashboard berdasarkan Role & Unit.

## 5. Security Rules Logic (Firebase)
- `match /siswa/{docId}`:
    - Allow read/write if request.auth.token.role == "SUPER_ADMIN"
    - Allow read/write if request.auth.token.unit == resource.data.unit

## 6. White-Label & Branding Configuration
Sistem harus menggunakan file `site-config.ts` untuk mempermudah penggantian identitas.

### Branding Schema:
- `institutionName`: "Al-Khoir Islamic School Bin Baz 5"
- `shortName`: "Al-Khoir"
- `colors`: 
    - `primary`: "#008000" (Hijau)
    - `secondary`: "#FFD700" (Kuning Emas)
- `units`: ["TK", "SD", "MTS", "MA"]

### UI Requirement:
- Gunakan CSS Variables atau Tailwind Configuration yang mengambil data dari `site-config.ts`.
- Pastikan logo dan nama yayasan di Header/Footer bersifat dinamis.
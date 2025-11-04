## Data Mahasiswa

## Nama : Cindy Revalina Simanullang

## Nim  : 312410417

## Kelas: TI.24 A3

## Mata Kuliah : Pemograman Web 1

---

## 🚀 Cara Menjalankan
1. Clone atau download repository.  
2. Buka folder project.  
3. Jalankan `index.html` di browser (Chrome/Edge/Firefox).  
> Tidak memerlukan server — client-side only.

---

## ✨ Fitur Utama
- Halaman Login sederhana  
- Dashboard menampilkan daftar buku  
- Halaman Stok untuk melihat jumlah stok buku  
- Halaman Tracking untuk melihat status pesanan  
- Halaman Checkout untuk menyelesaikan pesanan

---

## 📸 Preview & Penjelasan per Gambar

> Letakkan screenshot pada folder `img/` dengan nama file yang direkomendasikan di bawah. Ganti file sesuai hasil screenshotmu.

### 1. Login Page
**File:** `img/login-preview.png`  
**Penjelasan:**  
Halaman untuk autentikasi pengguna. Komponen utama:
- Form input email/username dan password  
- Tombol `Login`  
- Pesan validasi sederhana (cek input kosong / kredensial salah)  
**Tujuan:** Mengamankan akses ke dashboard dan fitur pemesanan.

https://github.com/cindyrevalina/lab1.web_UTS/blob/master/index.png?raw=true

---

### 2. Dashboard
**File:** `img/dashboard-preview.png`  
**Penjelasan:**  
Halaman utama setelah login. Menampilkan:
- Daftar buku (thumbnail, judul, harga singkat)  
- Tombol atau link menuju halaman detail / tambah ke keranjang  
- Ringkasan singkat (jumlah buku, notifikasi pesanan)  
**Tujuan:** Memudahkan pengguna menjelajah koleksi buku dan melakukan aksi cepat.

![Dashboard](img/dashboard-preview.png)

---

### 3. Halaman Stok Buku
**File:** `img/stok-preview.png`  
**Penjelasan:**  
Menampilkan informasi stok tiap buku:
- Nama buku, kode/ID, stok tersedia  
- Indikator stok rendah (opsional)  
- Fitur pencarian / filter sederhana (opsional)  
**Tujuan:** Memantau ketersediaan barang sebelum melakukan checkout.

![Stok Buku](img/stok-preview.png)

---

### 4. Tracking Pesanan
**File:** `img/tracking-preview.png`  
**Penjelasan:**  
Halaman untuk melihat status pesanan setelah checkout:
- Nomor/order ID, status (diproses / dikirim / selesai)  
- Estimasi waktu pengiriman (opsional)  
- Riwayat perubahan status (opsional)  
**Tujuan:** Memberi transparansi terhadap proses pemesanan ke pengguna.

![Tracking](img/tracking-preview.png)

---

### 5. Checkout
**File:** `img/checkout-preview.png`  
**Penjelasan:**  
Halaman konfirmasi pesanan sebelum pembayaran:
- Ringkasan item di keranjang (judul, jumlah, subtotal)  
- Form alamat pengiriman & nomor telepon  
- Tombol `Konfirmasi` / `Bayar`  
**Tujuan:** Mengumpulkan data final untuk memproses pesanan.

![Checkout](img/checkout-preview.png)

---

## 📦 Contoh Format Data (data.js)
```js
const buku = [
  {
    id: 1,
    judul: "Pengantar Komunikasi",
    penulis: "Nama Penulis",
    harga: 85000,
    stok: 10,
    gambar: "img/pengantar_komunikasi.jpg"
  },
  // ...data buku lainnya
];


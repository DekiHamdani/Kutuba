# Kutuba
Kuis Universitas Terbuka Gratis Untuk Latihan Soal Ujian

## 📄 README.md: Aplikasi Kuis Interaktif Pilihan Ganda

### **\# Aplikasi Kuis Interaktif Statis**

Sebuah aplikasi web kuis interaktif sederhana yang dibangun menggunakan HTML, CSS, dan JavaScript murni. Aplikasi ini memuat soal-soal dan data modul secara dinamis dari *file* JSON eksternal, memungkinkan penambahan mata pelajaran dan modul baru dengan mudah tanpa mengubah *logic* inti.

-----

### **\#\# 🚀 Fitur Utama**

  * **Pemuatan Data Asinkron:** Data mata pelajaran dan soal dimuat menggunakan `fetch()` dari *file* JSON (`subjects.json` dan JSON modul) setelah halaman dimuat.
  * **Navigasi Multi-Level:** Mendukung navigasi dari **Daftar Mata Pelajaran** ke **Daftar Modul** tertentu.
  * **Logika Kuis Interaktif:** Memungkinkan pemilihan jawaban, memberikan *feedback* instan (benar/salah), dan menampilkan penjelasan jawaban yang salah.
  * **Penghitungan Skor:** Menghitung skor akhir setelah semua soal dalam satu modul selesai.
  * **Desain Responsif:** Desain sederhana yang dapat menyesuaikan tampilan di perangkat *desktop* maupun *mobile*.

### **\#\# 📂 Struktur Proyek**

Struktur folder proyek ini dirancang agar mudah dikelola dan dikembangkan:

```
.
├── index.html           # Halaman utama aplikasi (Tampilan dan Struktur)
├── style.css            # Styling untuk tampilan aplikasi
├── script.js            # Logika utama aplikasi (Semua fungsi JavaScript)
├── data/
│   ├── subjects.json    # INDEX UTAMA: Daftar mata pelajaran & struktur modul
│   └── [folder-subjek]/ # Contoh folder untuk satu mata pelajaran
│       ├── Modul1.json  # File soal Modul 1
│       └── Modul2.json  # File soal Modul 2
└── README.md            # Dokumentasi proyek ini
```

### **\#\# ⚙️ Cara Menjalankan Secara Lokal**

Anda dapat menjalankan aplikasi ini langsung di *browser* Anda:

1.  **Clone Repositori:** Unduh atau *clone* repositori ini ke komputer lokal Anda.
    ```bash
    git clone https://www.andarepository.com/
    ```
2.  **Buka File:** Buka *file* `index.html` menggunakan *browser* web (seperti Chrome, Firefox, dll.).
3.  **Catatan Penting:** Karena menggunakan *Fetch API* untuk memuat *file* JSON lokal, Anda mungkin perlu menjalankannya melalui *local server* (misalnya menggunakan ekstensi "Live Server" pada VS Code) untuk menghindari *error* CORS (*Cross-Origin Resource Sharing*) pada beberapa *browser*.

### **\#\# ✏️ Cara Menambahkan Konten Baru**

Untuk menambahkan mata pelajaran atau modul baru, Anda hanya perlu mengedit *file* JSON, tanpa menyentuh kode JavaScript:

1.  **Tambahkan Mata Pelajaran Baru:** Edit *file* `data/subjects.json`.

    *Contoh format di `subjects.json`:*

    ```json
    {
      "namaMataPelajaran": "Fisika Dasar",
      "folder": "fisika",
      "jumlahModul": 3
    }
    ```

2.  **Tambahkan File Modul Baru:**

      * Buat folder baru di dalam `data/` sesuai dengan nilai `"folder"` yang Anda tentukan di atas (misalnya, `data/fisika/`).
      * Buat *file* JSON modul baru (misalnya, `Modul3.json`).
      * Pastikan *file* JSON modul berisi *array* soal dengan format kunci yang sama (`pertanyaan`, `pilihan`, `jawabanBenar`, `penjelasanSalah`).

### **\#\# 🤝 Kontribusi**

Jika Anda menemukan *bug* atau memiliki saran perbaikan, jangan ragu untuk membuka *Issue* atau mengajukan *Pull Request*.

### **\#\# 📜 Lisensi**

Proyek ini berada di bawah lisensi MIT.


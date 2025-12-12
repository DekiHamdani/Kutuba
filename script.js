// script.js - Logika Kuis Berbasis File Modul Terpisah

// ===================================
// BAGIAN 1: VARIABEL GLOBAL
// ===================================

let allSubjects = []; // Akan diisi oleh data dari subjects.json (INDEKS UTAMA)
let currentQuiz = []; // Berisi soal-soal modul yang sedang dimainkan
let currentQuestionIndex = 0;
let score = 0;
let selectedSubjectData = null; // Menyimpan data subjek yang dipilih (folder, jumlah modul)

// --- Elemen DOM ---
const subjectList = document.getElementById('subject-list');
const welcomeScreen = document.getElementById('welcome-screen');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const subjectTitle = document.getElementById('subject-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackArea = document.getElementById('feedback-area');
const nextButton = document.getElementById('next-button');


// ===================================
// BAGIAN 2: FUNGSI NAVIGASI
// ===================================

// 1. Fungsi untuk menampilkan daftar Mata Pelajaran (Subjek)
function showSubjects() {
    console.log("Fungsi showSubjects dipanggil. Mencoba mereset tampilan."); 

    subjectList.innerHTML = '<li><h3>Mata Pelajaran</h3></li>';

    allSubjects.forEach(subject => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = subject.namaMataPelajaran;
        button.onclick = () => renderModules(subject); 
        listItem.appendChild(button);
        subjectList.appendChild(listItem);
    });

    // **PENTING: Pastikan #sidebar selalu 'block' atau 'flex'**
    // Karena container menggunakan flex, kita gunakan 'block' atau biarkan CSS yang menentukan.
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'block'; // Atau 'flex', tergantung tata letak yang diinginkan
    }

    // *** KEMBALIKAN KE STYLE NON-PEMANSAAN (HAPUS setProperty) ***
    quizArea.style.display = 'none';
    resultArea.style.display = 'none';
    welcomeScreen.style.display = 'block'; 
    
    document.getElementById('welcome-message').textContent = "Selamat Datang! Pilih Mata Pelajaran di samping.";
    console.log("Tampilan berhasil di-reset (Secara Kode).");
}

// script.js

// 2. Fungsi untuk menampilkan daftar Modul
function renderModules(subjectData) {
    selectedSubjectData = subjectData;

    subjectList.innerHTML = '';

    // Tambahkan tombol 'Kembali ke Subjek'
    const backButtonListItem = document.createElement('li');
    
    // *** PERUBAHAN UTAMA: GUNAKAN TAG <a> UNTUK MEMAKSA RELOAD ***
    const backLink = document.createElement('a');
    backLink.textContent = '← Kembali ke Mata Pelajaran';
    backLink.href = 'index.html'; // Tautkan langsung ke halaman utama
    backLink.className = 'back-button-link'; // Tambahkan kelas untuk styling (jika perlu)
    
    // Gantikan tombol lama dengan tautan ini
    backButtonListItem.appendChild(backLink);
    subjectList.appendChild(backButtonListItem);
    
    // Judul Modul
    subjectList.innerHTML += `<li><h3>Modul ${subjectData.namaMataPelajaran}</h3></li>`;

    // Tampilkan tombol untuk setiap Modul
    for (let i = 1; i <= subjectData.jumlahModul; i++) {
        const moduleName = `Modul ${i}`;
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = moduleName;
        button.onclick = () => loadModuleData(subjectData, i); 
        listItem.appendChild(button);
        subjectList.appendChild(listItem);
    }
    
    // Logika tampilan tetap sama
    quizArea.style.display = 'none';
    resultArea.style.display = 'none';
    welcomeScreen.style.display = 'block';
    document.getElementById('welcome-message').textContent = `Pilih Modul untuk ${subjectData.namaMataPelajaran}`;
}

// ... (lanjutkan dengan kode script.js lainnya)

// 3. Fungsi untuk memuat file JSON modul tertentu dan memulai kuis
async function loadModuleData(subjectData, moduleNumber) {
    const filePath = `data/${subjectData.folder}/Modul${moduleNumber}.json`;
    const moduleName = `Modul ${moduleNumber}`;
    
    try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Modul ${moduleNumber} belum tersedia.`);
        }
        
        const moduleSoal = await response.json();
        
        startQuiz(subjectData.namaMataPelajaran, moduleName, moduleSoal);

    } catch (error) {
        alert(`Gagal memuat ${moduleName}: ${error.message}`);
        console.error(`Gagal memuat data dari ${filePath}:`, error);
    }
}

// 4. Fungsi untuk memulai kuis
function startQuiz(subjectName, moduleName, moduleSoal) {
    
    currentQuiz = moduleSoal;
    currentQuestionIndex = 0;
    score = 0;

    welcomeScreen.style.display = 'none';
    resultArea.style.display = 'none';
    quizArea.style.display = 'block';

    subjectTitle.textContent = `${subjectName}: ${moduleName}`;
    displayQuestion();
}


// ===================================
// BAGIAN 3: FUNGSI LOGIKA KUIS
// ===================================

// 5. Fungsi untuk menampilkan pertanyaan
function displayQuestion() {
    feedbackArea.style.display = 'none';
    nextButton.style.display = 'none';
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex >= currentQuiz.length) {
        showResults();
        return;
    }

    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionText.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.pertanyaan}`;

    currentQuestion.pilihan.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, currentQuestion);
        optionsContainer.appendChild(button);
    });
}


// 6. Fungsi untuk mengecek jawaban
function checkAnswer(selectedOption, currentQuestion) {
    const buttons = optionsContainer.querySelectorAll('button');
    const isCorrect = selectedOption === currentQuestion.jawabanBenar;

    buttons.forEach(btn => {
        btn.classList.add('disabled');
        if (btn.textContent === currentQuestion.jawabanBenar) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedOption) {
            btn.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score++;
        feedbackArea.innerHTML = "<strong>✅ Jawaban Anda Benar!</strong>";
        feedbackArea.style.display = 'block';
        feedbackArea.style.borderColor = '#28a745';
        feedbackArea.style.backgroundColor = '#d4edda';
        feedbackArea.style.color = '#155724';
    } else {
        feedbackArea.innerHTML = `<strong>❌ Jawaban Salah.</strong><br>${currentQuestion.penjelasanSalah}`;
        feedbackArea.style.display = 'block';
        feedbackArea.style.borderColor = '#dc3545';
        feedbackArea.style.backgroundColor = '#f8d7da';
        feedbackArea.style.color = '#721c24';
    }

    nextButton.style.display = 'block';
}


// 7. Fungsi untuk menampilkan hasil akhir
function showResults() {
    quizArea.style.display = 'none';
    resultArea.style.display = 'block';

    const totalQuestions = currentQuiz.length;
    const resultBox = document.getElementById('result-area');
    
    // Bersihkan result-area dari tombol-tombol lama (jika ada)
    resultBox.innerHTML = `
        <h2>🎉 Kuis Selesai! 🎉</h2>
        <p>Mata Pelajaran: <span id="final-subject">${selectedSubjectData.namaMataPelajaran}</span></p>
        <p>Total Soal: <span id="total-questions">${totalQuestions}</span></p>
        <h3 id="final-score-text">Skor Anda: ${score} dari ${totalQuestions}</h3>
    `;
    
    // Tambahkan Tombol Kembali ke Modul/Subjek
    const backToModuleButton = document.createElement('button');
    backToModuleButton.textContent = 'Selesai & Kembali ke Modul';
    backToModuleButton.onclick = () => renderModules(selectedSubjectData);
    resultBox.appendChild(backToModuleButton);
    
    // Ganti tombol lama "Mulai Kuis Baru" di HTML dengan tombol navigasi JS
}


// 8. Event Listener untuk Tombol "Soal Selanjutnya"
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});


// ===================================
// BAGIAN 4: INISIALISASI & PEMUATAN DATA UTAMA
// ===================================

// --- Fungsi untuk memuat data kuis dari subjects.json ---
async function loadQuizData() {
    try {
        const response = await fetch('data/subjects.json'); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allSubjects = await response.json();
        
        showSubjects(); 

    } catch (error) {
        console.error("Gagal memuat data indeks kuis:", error);
        document.getElementById('welcome-message').textContent = 
            'Gagal memuat kuis. Pastikan folder **data/** dan file **subjects.json** ada dan formatnya benar.';
        // Tambahkan cek keamanan lain jika welcome-message gagal dimuat
        if(welcomeScreen) welcomeScreen.style.display = 'block';
    }
}


// --- Inisialisasi Aplikasi ---
document.addEventListener('DOMContentLoaded', () => {
    loadQuizData(); 
});
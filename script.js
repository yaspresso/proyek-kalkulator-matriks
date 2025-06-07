// script.js

// --- Global Variables / Variabel Global ---
// Mengambil referensi elemen-elemen HTML
const matrixRowsInput = document.getElementById('matrixRows');
const matrixColsInput = document.getElementById('matrixCols');
const createMatricesBtn = document.getElementById('createMatricesBtn');
const matricesContainer = document.getElementById('matricesContainer');
const matrixASelect = document.getElementById('matrixASelect');
const matrixBSelect = document.getElementById('matrixBSelect');
const operationSelect = document.getElementById('operationSelect');
const calculateBtn = document.getElementById('calculateBtn');
const resultMatrixDiv = document.getElementById('resultMatrix');

// Variabel untuk menyimpan matriks A dan B yang dibuat
let matrixA = [];
let matrixB = [];
let rows = 0;
let cols = 0;

// --- Helper Functions / Fungsi Pembantu ---

// Fungsi untuk membuat elemen input matriks dinamis
function createMatrixInput(idPrefix, r, c) {
    let html = `<h3>Matriks ${idPrefix.toUpperCase()}</h3>`;
    html += `<div class="matrix-table" id="${idPrefix}Table" style="grid-template-columns: repeat(${c}, 1fr);">`;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            html += `<input type="number" class="matrix-input" id="${idPrefix}-${i}-${j}" value="0">`;
        }
    }
    html += `</div>`;
    return html;
}

// Fungsi untuk mendapatkan nilai dari input matriks di DOM
function getMatrixValues(idPrefix, r, c) {
    const matrix = [];
    for (let i = 0; i < r; i++) {
        matrix[i] = [];
        for (let j = 0; j < c; j++) {
            const inputElement = document.getElementById(`${idPrefix}-${i}-${j}`);
            // Pastikan input adalah angka, jika tidak, anggap 0
            matrix[i][j] = parseFloat(inputElement.value) || 0;
        }
    }
    return matrix;
}

// Fungsi untuk menampilkan matriks hasil
function displayResultMatrix(result, r, c) {
    let html = `<div class="result-matrix-table" style="grid-template-columns: repeat(${c}, 1fr);">`;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            html += `<div>${parseFloat(result[i][j].toFixed(2))}</div>`;
        }
    }
    html += `</div>`;
    resultMatrixDiv.innerHTML = html;
}

// --- Matrix Operations / Operasi Matriks ---

// Penjumlahan Matriks
function addMatrices(mat1, mat2) {
    // Validasi: ordo harus sama
    if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) {
        alert("Penjumlahan/Pengurangan Matriks: Ordo kedua matriks harus sama!");
        return null;
    }
    const result = [];
    for (let i = 0; i < mat1.length; i++) {
        result[i] = [];
        for (let j = 0; j < mat1[0].length; j++) {
            result[i][j] = mat1[i][j] + mat2[i][j];
        }
    }
    return result;
}

// Pengurangan Matriks
function subtractMatrices(mat1, mat2) {
    // Validasi: ordo harus sama
    if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) {
        alert("Penjumlahan/Pengurangan Matriks: Ordo kedua matriks harus sama!");
        return null;
    }
    const result = [];
    for (let i = 0; i < mat1.length; i++) {
        result[i] = [];
        for (let j = 0; j < mat1[0].length; j++) {
            result[i][j] = mat1[i][j] - mat2[i][j];
        }
    }
    return result;
}

// Perkalian Matriks
function multiplyMatrices(mat1, mat2) {
    // Validasi: jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua
    if (mat1[0].length !== mat2.length) {
        alert("Perkalian Matriks: Jumlah kolom Matriks A harus sama dengan jumlah baris Matriks B!");
        return null;
    }
    const result = [];
    const mat1Rows = mat1.length;
    const mat1Cols = mat1[0].length;
    const mat2Cols = mat2[0].length;

    for (let i = 0; i < mat1Rows; i++) {
        result[i] = [];
        for (let j = 0; j < mat2Cols; j++) {
            let sum = 0;
            for (let k = 0; k < mat1Cols; k++) {
                sum += mat1[i][k] * mat2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

// --- Event Listeners / Penanganan Event ---

// Ketika tombol "Buat Matriks" diklik
createMatricesBtn.addEventListener('click', () => {
    // Ambil nilai baris dan kolom dari input
    rows = parseInt(matrixRowsInput.value);
    cols = parseInt(matrixColsInput.value);

    // Validasi dasar
    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert("Bro, masukkan jumlah baris dan kolom yang valid (angka positif ya)!");
        return;
    }

    // Hapus matriks sebelumnya jika ada
    matricesContainer.innerHTML = '';
    resultMatrixDiv.innerHTML = ''; // Kosongkan juga hasil

    // Buat input untuk Matriks A
    matricesContainer.innerHTML += createMatrixInput('matrix-a', rows, cols);
    // Buat input untuk Matriks B
    matricesContainer.innerHTML += createMatrixInput('matrix-b', rows, cols);

    // 🟩 PENAMBAHAN 1: Panggil fungsi baru ini setelah matriks dibuat
    attachMatrixInputListeners();
    // END PENAMBAHAN 1

    matrixASelect.innerHTML = '<option value="matrix-a">A</option>';
    matrixBSelect.innerHTML = '<option value="matrix-b">B</option>';
});

// Ketika tombol "Hitung" diklik
calculateBtn.addEventListener('click', () => {
    // Pastikan matriks sudah dibuat
    if (rows === 0 || cols === 0) {
        alert("Bro, buat matriksnya dulu ya di bagian 'Pengaturan Matriks'!");
        return;
    }

    // Ambil nilai matriks A dan B dari input
    matrixA = getMatrixValues('matrix-a', rows, cols);
    matrixB = getMatrixValues('matrix-b', rows, cols);

    const operation = operationSelect.value;
    let result = null;

    // Lakukan operasi sesuai pilihan
    switch (operation) {
        case 'add':
            result = addMatrices(matrixA, matrixB);
            break;
        case 'subtract':
            result = subtractMatrices(matrixA, matrixB);
            break;
        case 'multiply':
            result = multiplyMatrices(matrixA, matrixB);
            break;
        default:
            alert("Operasi tidak dikenal.");
            return;
    }

    // Tampilkan hasil jika tidak ada error
    if (result) {
        displayResultMatrix(result, result.length, result[0].length);
    } else {
        resultMatrixDiv.innerHTML = '<p style="color: red; text-align: center;">Tidak dapat menampilkan hasil karena ordo matriks tidak sesuai untuk operasi ini.</p>';
    }
});

// 🟦 PENAMBAHAN 2: Fungsi baru untuk attach event listeners ke input matriks
function attachMatrixInputListeners() {
    const inputs = matricesContainer.querySelectorAll('.matrix-input'); // Ambil semua input dengan class matrix-input
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            // Saat input mendapat fokus (diklik/tab), jika nilainya '0', kosongkan
            if (this.value === '0') {
                this.value = '';
            }
        });

input.addEventListener('blur', function() {
            // Saat fokus hilang dari input, jika nilainya kosong, kembalikan ke '0'
            if (this.value === '') {
                this.value = '0';
            }
        });
    });
}
// END PENAMBAHAN 2

// Inisialisasi awal (jika perlu)
// Misalnya, buat matriks 2x2 secara default saat halaman dimuat
// createMatricesBtn.click(); // Kamu bisa uncomment ini jika ingin langsung menampilkan matriks 2x2 saat load
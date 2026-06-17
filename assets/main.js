// ===== Data Program Kerja =====
const prokerData = [
  { nama:"PROLEGUN", komisi:"Badan Legislasi", icon:"📜", kategori:"legislasi", desc:"Program Legislative Universitas — RKT DPM KM Udinus yang bertujuan membahas dan menetapkan kebijakan strategis terkait Undang-Undang Keluarga Mahasiswa (UU KM).", badge:"badge-legislasi", label:"Legislasi" },
  { nama:"RDP", komisi:"Badan Legislasi", icon:"🏛️", kategori:"legislasi", desc:"Rapat Dengar Pendapat — forum partisipatif bagi seluruh perwakilan ORMAWA Udinus untuk menyampaikan aspirasi, kritik dan saran terkait Undang-Undang Keluarga Mahasiswa (UU KM).", badge:"badge-legislasi", label:"Legislasi" },
  { nama:"RAKOR dengan BEM KM", komisi:"Badan Pengawasan", icon:"🤝", kategori:"pengawasan", desc:"Kegiatan Rapat Koordinasi antara DPM KM dengan BEM KM menjadi awal penyamaan visi dalam menjalankan pengawasan proker selama 1 periode.", badge:"badge-pengawasan", label:"Pengawasan" },
  { nama:"LPJTT BEM KM", komisi:"Badan Pengawasan", icon:"📊", kategori:"pengawasan", desc:"Laporan Pertanggung Jawaban Tengah Tahun merupakan forum pelaporan dan evaluasi proker BEM KM selama setengah periode.", badge:"badge-pengawasan", label:"Pengawasan" },
  { nama:"LPJAT BEM KM", komisi:"Badan Pengawasan", icon:"📋", kategori:"pengawasan", desc:"Laporan Pertanggung Jawaban Akhir Tahun merupakan forum pelaporan dan evaluasi proker BEM KM selama satu periode.", badge:"badge-pengawasan", label:"Pengawasan" },
  { nama:"RESES", komisi:"Badan Advokasi", icon:"📢", kategori:"advokasi", desc:"Kegiatan ini menjadi ruang strategis untuk menyerap aspirasi, menjaring proker, dan menguatkan antar lembaga legislatif mahasiswa.", badge:"badge-advokasi", label:"Advokasi" },
  { nama:"Dialog Aspirasi", komisi:"Badan Advokasi", icon:"💬", kategori:"advokasi", desc:"Wadah komunikasi antara mahasiswa dengan pihak birokrasi kampus.", badge:"badge-advokasi", label:"Advokasi" },
];

// ===== Render Program Kerja =====
function renderProker(filter = 'semua') {
  const grid = document.getElementById('prokerGrid');
  const data = filter === 'semua' ? prokerData : prokerData.filter(p => p.kategori === filter);
  grid.innerHTML = data.map(p => `
    <div class="proker-card">
      <div class="proker-header">
        <div class="proker-icon">${p.icon}</div>
        <div><div class="proker-name">${p.nama}</div><div class="proker-komisi">${p.komisi}</div></div>
      </div>
      <div class="proker-body">
        <p class="proker-desc">${p.desc}</p>
        <div class="proker-meta"><span class="proker-badge ${p.badge}">${p.label}</span></div>
      </div>
    </div>`).join('');
  // Efek muncul
  document.querySelectorAll('.proker-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
}

// ===== Filter Proker =====
function filterProker(kat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProker(kat);
}

// ===== Kirim Aspirasi =====
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfCT-NMjYGbOd6X7JOiaGmS9bksoyOAfQ7WkDRNYThj5Bx5PcA5n1bgNeOYwshC_MuDw/exec";

async function submitAspirasi() {
  const nama = document.getElementById('f-nama').value.trim();
  const nim = document.getElementById('f-nim').value.trim();
  const prodi = document.getElementById('f-prodi').value;
  const kategori = document.getElementById('f-kategori').value;
  const isi = document.getElementById('f-isi').value.trim();
  if (!nama || !nim || !isi || kategori === '-- Pilih Kategori --') {
    alert('⚠️ Harap isi semua field yang wajib diisi (Nama, NIM, Kategori, dan Isi Aspirasi).');
    return;
  }
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Mengirim...';
  const payload = { nama, nim, prodi, kategori, isi, waktu: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) };
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // Reset form
    ['f-nama', 'f-nim', 'f-isi'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('f-prodi').selectedIndex = 0;
    document.getElementById('f-kategori').selectedIndex = 0;
    // Tampilkan toast
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 5000);
  } catch (e) {
    alert('❌ Gagal mengirim. Periksa koneksi internet Anda.');
  }
  btn.disabled = false;
  btn.textContent = 'Kirim Aspirasi ✉️';
}

// ===== Toggle Menu Mobile =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== Efek Scroll Navbar =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50 ? 'rgba(26,58,92,0.99)' : 'rgba(26,58,92,0.97)';
});

// ===== Intersection Observer untuk animasi elemen =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  // Render proker awal
  renderProker('semua');
  // Amati elemen yang perlu animasi
  document.querySelectorAll('.news-small, .contact-item, .pillar, .vm-card, .org-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
});
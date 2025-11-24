$(document).ready(function () {
  // ----- Elemen UI utama -----
  // Tombol burger/penyebab buka sidebar
  let burger = $(`#menuToggle`);
  // Sidebar kiri yang berisi menu
  let navbar = $(`#sideNavbar`);
  // Overlay gelap saat sidebar terbuka pada layar kecil
  let overlay = $(`#navbarOverlay`);
  // Tombol close (X) pada sidebar
  let closeBtn = $(`#closeNavbar`);
  // Kontainer tempat template hasil kloning dimasukkan
  let contentContainer = $(`#content-container`);

  // Toggle tampilan sidebar ketika tombol burger diklik
  burger.click(function () {
    $(this).toggleClass(`active`);
    navbar.toggleClass(`active`);
    overlay.toggleClass(`active`);
  });

  // Jika user klik area overlay, tutup sidebar
  overlay.click(function () {
    burger.removeClass("active");
    navbar.removeClass("active");
    overlay.removeClass("active");
  });

  // Tombol close pada sidebar juga menutup sidebar
  closeBtn.click(function () {
    burger.removeClass("active");
    navbar.removeClass("active");
    overlay.removeClass("active");
  });

  // Saat user klik item pada sidebar, muat template terkait
  // Menggunakan attribute data-section pada tiap .navbar-item
  $(".navbar-item").click(function () {
    let section = $(this).data("section");

    // Tutup sidebar (khususnya pada layar kecil)
    burger.removeClass("active");
    navbar.removeClass("active");
    overlay.removeClass("active");

    // Tandai item aktif secara visual
    $(".navbar-item").removeClass("active");
    $(this).addClass("active");

    // Cari template HTML dengan id `template-<section>` dan kloning isinya
    let template = document.querySelector(`#template-${section}`);
    if (template) {
      contentContainer.empty();
      let clone = template.content.cloneNode(true);
      contentContainer.append(clone);

      // Jika template yang dimuat adalah Data Keluarga, render tabelnya
      if (section === "keluarga") {
        renderTabelKeluarga();
      }
    }
  });

  // ===== Kalkulator: Persegi =====
  // Menghitung luas dan keliling persegi
  $(document).on("click", `.btn-calc[data-calc="persegi"]`, function (e) {
    e.preventDefault();
    let sisi = parseFloat($(`#d_persegi_s`).val());

    // Validasi input
    if (isNaN(sisi) || sisi <= 0) {
      $(`#r_persegi`).html(
        `<p style="color:red;">Masukkan nilai sisi yang benar!</p>`
      );
      return;
    }

    let luas = sisi * sisi;
    let keliling = 4 * sisi;

    // Tampilkan hasil (dibulatkan)
    $(`#r_persegi`).html(`<p><strong>Hasil:</strong></p>
         <p>Luas: ${Math.round(luas)} cm²</p>
         <p>Keliling: ${Math.round(keliling)} cm</p>`);
  });

  // Reset form Persegi
  $(document).on("click", `.btn-reset[data-reset="persegi"]`, function () {
    $(`#d_persegi_s`).val("");
    $(`#r_persegi`).html("");
  });

  // ===== Kalkulator: Persegi Panjang =====
  // Menghitung luas dan keliling persegi panjang
  $(document).on("click", `.btn-calc[data-calc="pp"]`, function () {
    let p = parseFloat($(`#d_pp_p`).val());
    let l = parseFloat($(`#d_pp_l`).val());

    if (isNaN(p) || isNaN(l) || p <= 0 || l <= 0) {
      $(`#r_pp`).html(
        `<p style="color:red;">Masukkan nilai panjang dan lebar yang benar!</p>`
      );
      return;
    }

    let luas = p * l;
    let keliling = 2 * (p + l);

    $(`#r_pp`).html(`<p><strong>Hasil:</strong></p>
      <p>Luas: ${Math.round(luas)} cm²</p>
      <p>Keliling: ${Math.round(keliling)} cm</p>`);
  });

  // Reset Persegi Panjang
  $(document).on("click", `.btn-reset[data-reset="pp"]`, function () {
    $(`#d_pp_p`).val("");
    $(`#d_pp_l`).val("");
    $(`#r_pp`).html("");
  });

  // ===== Kalkulator: Segitiga =====
  // Menghitung luas, (opsional) keliling, klasifikasi, dan pemeriksaan siku-siku
  $(document).on("click", `.btn-calc[data-calc="segitiga"]`, function () {
    let a = parseFloat($(`#d_sg_a`).val());
    let t = parseFloat($(`#d_sg_t`).val());
    let b = parseFloat($(`#d_sg_b`).val());
    let c = parseFloat($(`#d_sg_c`).val());

    if (isNaN(a) || isNaN(t) || a <= 0 || t <= 0) {
      $(`#r_sg`).html(
        `<p style="color:red;">Masukkan nilai alas dan tinggi yang benar!</p>`
      );
      return;
    }

    // Hitung luas dasar
    let luas = (a * t) / 2;

    // Keliling hanya dihitung jika sisi b dan c diberikan
    let keliling = null;
    if (!isNaN(b) && !isNaN(c) && b > 0 && c > 0) {
      keliling = a + b + c;
    }

    // Klasifikasi segitiga (sama sisi / sama kaki / sembarang)
    let klasifikasi = "Belum ada data sisi b dan c";
    if (!isNaN(b) && !isNaN(c) && b > 0 && c > 0) {
      if (a === b && b === c) {
        klasifikasi = "Sama sisi";
      } else if (a === b || b === c || a === c) {
        klasifikasi = "Sama kaki";
      } else {
        klasifikasi = "Sembarang";
      }
    }

    // Pemeriksaan siku-siku (menggunakan Teorema Pythagoras)
    let siku = "Belum ada data sisi b dan c";
    let hipotenusa = null;
    if (!isNaN(b) && !isNaN(c) && b > 0 && c > 0) {
      let a2 = a * a;
      let b2 = b * b;
      let c2 = c * c;

      if (a2 + b2 === c2) {
        siku = "Siku-siku (hipotenusa = sisi c)";
        hipotenusa = c;
      } else if (a2 + c2 === b2) {
        siku = "Siku-siku (hipotenusa = sisi b)";
        hipotenusa = b;
      } else if (b2 + c2 === a2) {
        siku = "Siku-siku (hipotenusa = sisi a)";
        hipotenusa = a;
      } else {
        siku = "Bukan siku-siku";
      }
    }

    // Susun HTML hasil dan tampilkan
    let html = `<p><strong>Hasil:</strong></p>`;
    html += `<p>Luas: ${Math.round(luas)} cm²</p>`;
    if (keliling !== null)
      html += `<p>Keliling: ${Math.round(keliling)} cm</p>`;
    html += `<p>Klasifikasi: ${klasifikasi}</p>`;
    html += `<p>Pemeriksaan Siku-siku: ${siku}</p>`;
    if (hipotenusa !== null)
      html += `<p>Hipotenusa: ${Math.round(hipotenusa)} cm</p>`;

    $(`#r_sg`).html(html);
  });

  // Reset Segitiga
  $(document).on("click", `.btn-reset[data-reset="segitiga"]`, function () {
    $(`#d_sg_a`).val("");
    $(`#d_sg_t`).val("");
    $(`#d_sg_b`).val("");
    $(`#d_sg_c`).val("");
    $(`#r_sg`).html("");
  });

  // ===== Kalkulator: Lingkaran =====
  // Menghitung luas dan keliling lingkaran berdasarkan jari-jari
  $(document).on("click", `.btn-calc[data-calc="lingkaran"]`, function () {
    let r = parseFloat($(`#d_lg_r`).val());

    if (isNaN(r) || r <= 0) {
      $(`#r_lg`).html(
        `<p style="color:red;">Masukkan nilai jari-jari yang benar!</p>`
      );
      return;
    }

    let luas = Math.PI * r * r;
    let keliling = 2 * Math.PI * r;

    $(`#r_lg`).html(`<p><strong>Hasil:</strong></p>
      <p>Luas: ${Math.round(luas)} cm²</p>
      <p>Keliling: ${Math.round(keliling)} cm</p>`);
  });

  $(document).on("click", `.btn-reset[data-reset="lingkaran"]`, function () {
    $(`#d_lg_r`).val("");
    $(`#r_lg`).html("");
  });

  // ===== Kalkulator: Kubus =====
  // Menghitung volume dan luas permukaan kubus dari panjang sisi
  $(document).on("click", `.btn-calc[data-calc="kubus"]`, function () {
    let s = parseFloat($(`#r_kubus_s`).val());

    if (isNaN(s) || s <= 0) {
      $(`#res_kubus`).html(
        `<p style="color:red;"> Masukkan nilai sisi yang benar!</p>`
      );
      return;
    }

    let volume = Math.pow(s, 3);
    let luasPermukaan = 6 * s * s;

    $(`#res_kubus`).html(`<p><strong>Hasil:</strong></p>
      <p>Volume: ${Math.round(volume)} cm³</p>
      <p>Luas Permukaan: ${Math.round(luasPermukaan)} cm²</p>`);
  });

  $(document).on("click", `.btn-reset[data-reset="kubus"]`, function () {
    $(`#r_kubus_s`).val("");
    $(`#res_kubus`).html("");
  });

  // ===== Kalkulator: Balok =====
  // Menghitung volume dan luas permukaan balok (panjang x lebar x tinggi)
  $(document).on("click", `.btn-calc[data-calc="balok"]`, function () {
    let p = parseFloat($(`#r_balok_p`).val());
    let l = parseFloat($(`#r_balok_l`).val());
    let t = parseFloat($(`#r_balok_t`).val());

    if (isNaN(p) || isNaN(l) || isNaN(t) || p <= 0 || l <= 0 || t <= 0) {
      $(`#res_balok`).html(
        `<p style="color:red;">Masukkan nilai panjang, lebar, dan tinggi yang benar!</p>`
      );
      return;
    }

    let volume = p * l * t;
    let luasPermukaan = 2 * (p * l + p * t + l * t);

    $(`#res_balok`).html(`<p><strong>Hasil:</strong></p>
      <p>Volume: ${Math.round(volume)} cm³</p>
      <p>Luas Permukaan: ${Math.round(luasPermukaan)} cm²</p>`);
  });

  $(document).on("click", `.btn-reset[data-reset="balok"]`, function () {
    $(`#r_balok_p`).val("");
    $(`#r_balok_l`).val("");
    $(`#r_balok_t`).val("");
    $(`#res_balok`).html("");
  });

  // ===== Kalkulator: Tabung =====
  // Menghitung volume dan luas permukaan tabung (menggunakan jari-jari dan tinggi)
  $(document).on("click", `.btn-calc[data-calc="tabung"]`, function () {
    let r = parseFloat($(`#r_tb_r`).val());
    let t = parseFloat($(`#r_tb_t`).val());

    if (isNaN(r) || isNaN(t) || r <= 0 || t <= 0) {
      $(`#res_tabung`).html(
        `<p style="color:red;">Masukkan nilai jari-jari dan tinggi yang benar!</p>`
      );
      return;
    }

    let volume = Math.PI * r * r * t;
    let luasPermukaan = 2 * Math.PI * r * (r + t);

    $(`#res_tabung`).html(`<p><strong>Hasil:</strong></p>
      <p>Volume: ${Math.round(volume)} cm³</p>
      <p>Luas Permukaan: ${Math.round(luasPermukaan)} cm²</p>`);
  });

  $(document).on("click", `.btn-reset[data-reset="tabung"]`, function () {
    $(`#r_tb_r`).val("");
    $(`#r_tb_t`).val("");
    $(`#res_tabung`).html("");
  });

  // ===== Kalkulator: Bola =====
  // Menghitung volume dan luas permukaan bola dari jari-jari
  $(document).on("click", `.btn-calc[data-calc="bola"]`, function () {
    let r = parseFloat($(`#r_bl_r`).val());

    if (isNaN(r) || r <= 0) {
      $(`#res_bola`).html(
        `<p style="color:red;">Masukkan nilai jari-jari yang benar!</p>`
      );
      return;
    }

    let volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    let luasPermukaan = 4 * Math.PI * r * r;

    $(`#res_bola`).html(`<p><strong>Hasil:</strong></p>
      <p>Volume: ${Math.round(volume)} cm³</p>
      <p>Luas Permukaan: ${Math.round(luasPermukaan)} cm²</p>`);
  });

  $(document).on("click", `.btn-reset[data-reset="bola"]`, function () {
    $(`#r_bl_r`).val("");
    $(`#res_bola`).html("");
  });

  function ensureMenuState() {
    if ($(window).width() >= 1025) {
      burger.removeClass("active");
      navbar.removeClass("active");
      overlay.removeClass("active");
    }
  }

  $(window).on("resize", ensureMenuState);
  ensureMenuState();

  // ===== DATA KELUARGA =====
  let dataKeluarga = [];
  let editingIndex = -1;

  // Muat data dari localStorage saat halaman dimulai
  function loadDataKeluarga() {
    let saved = localStorage.getItem("dataKeluarga");
    if (saved) {
      dataKeluarga = JSON.parse(saved);
    }
  }

  // Simpan data ke localStorage setiap kali ada perubahan
  function saveDataKeluarga() {
    localStorage.setItem("dataKeluarga", JSON.stringify(dataKeluarga));
  }

  function renderTabelKeluarga() {
    let tbody = $("#tbody_keluarga");
    tbody.empty();

    if (dataKeluarga.length === 0) {
      $("#pesan_kosong").show();
      return;
    }

    $("#pesan_kosong").hide();

    // Loop setiap data keluarga dalam array
    // item = 1 anggota keluarga (nama, umur, jk, dll)
    // idx = nomor urut (0, 1, 2, ...)
    dataKeluarga.forEach((item, idx) => {
      // Buat string HTML untuk 1 baris tabel
      let row = `
        <tr>
          <td>${idx + 1}</td>
          <td>${item.nama}</td>
          <td>${item.umur}</td>
          <td>${item.jk}</td>
          <td>${item.hubungan}</td>
          <td>${item.pekerjaan}</td>
          <td>${item.telp}</td>
          <td>
            <!-- Tombol Edit: saat diklik, akan isi form dengan data ini (warna biru) -->
            <button class="button is-small is-info btn-edit-fam" data-idx="${idx}">Edit</button>
            <!-- Tombol Hapus: saat diklik, akan hapus data ini (warna merah) -->
            <button class="button is-small is-danger btn-hapus-fam" data-idx="${idx}">Hapus</button>
          </td>
        </tr>
      `;
      // Tambahkan baris HTML ke dalam tabel (#tbody_keluarga)
      tbody.append(row);
    });
  }

  // Fungsi untuk membersihkan form dan reset status edit
  function clearForm() {
    // Kosongkan semua input field form
    $("#fam_nama").val("");
    $("#fam_umur").val("");
    $("#fam_jk").val("");
    $("#fam_hubungan").val("");
    $("#fam_pekerjaan").val("");
    $("#fam_telp").val("");
    $("#fam_alamat").val("");
    // Reset status edit (tidak sedang edit data manapun)
    editingIndex = -1;
    // Tampilkan tombol Tambah, sembunyikan tombol Simpan/Edit
    $("#btn_tambah_keluarga").show();
    $("#btn_edit_keluarga").hide();
  }

  // Handler: Tombol "Tambah" diklik - tambahkan data keluarga baru
  $(document).on("click", "#btn_tambah_keluarga", function () {
    // Ambil nilai dari form dan hapus spasi di awal/akhir
    let nama = $("#fam_nama").val().trim();
    let umur = $("#fam_umur").val().trim();
    let jk = $("#fam_jk").val();
    let hubungan = $("#fam_hubungan").val();
    let pekerjaan = $("#fam_pekerjaan").val().trim();
    let telp = $("#fam_telp").val().trim();
    let alamat = $("#fam_alamat").val().trim();

    // Validasi: pastikan field wajib tidak kosong
    if (!nama || !umur || !jk || !hubungan) {
      alert("Nama, Umur, Jenis Kelamin, dan Hubungan harus diisi!");
      return;
    }

    // Tambahkan data baru ke array dataKeluarga
    dataKeluarga.push({
      nama: nama,
      umur: umur,
      jk: jk,
      hubungan: hubungan,
      pekerjaan: pekerjaan,
      telp: telp,
      alamat: alamat,
    });

    // Simpan ke localStorage
    saveDataKeluarga();
    // Bersihkan form
    clearForm();
    // Render ulang tabel untuk menampilkan data baru
    renderTabelKeluarga();
  });

  // Handler: Tombol "Edit" pada baris tabel diklik - isi form dengan data yg ada
  $(document).on("click", ".btn-edit-fam", function () {
    // Ambil index data dari atribut data-idx tombol
    let idx = $(this).data("idx");
    // Cari data di array berdasarkan index
    let item = dataKeluarga[idx];

    // Isi form dengan data yang ada
    $("#fam_nama").val(item.nama);
    $("#fam_umur").val(item.umur);
    $("#fam_jk").val(item.jk);
    $("#fam_hubungan").val(item.hubungan);
    $("#fam_pekerjaan").val(item.pekerjaan);
    $("#fam_telp").val(item.telp);
    $("#fam_alamat").val(item.alamat);

    // Catat index yang sedang diedit
    editingIndex = idx;
    // Sembunyikan tombol Tambah, tampilkan tombol Simpan/Edit
    $("#btn_tambah_keluarga").hide();
    $("#btn_edit_keluarga").show();

    // Scroll halaman ke atas agar form terlihat
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  // Handler: Tombol "Simpan/Edit" diklik - simpan perubahan data yang sedang diedit
  $(document).on("click", "#btn_edit_keluarga", function () {
    // Ambil nilai terbaru dari form
    let nama = $("#fam_nama").val().trim();
    let umur = $("#fam_umur").val().trim();
    let jk = $("#fam_jk").val();
    let hubungan = $("#fam_hubungan").val();
    let pekerjaan = $("#fam_pekerjaan").val().trim();
    let telp = $("#fam_telp").val().trim();
    let alamat = $("#fam_alamat").val().trim();

    // Validasi field wajib
    if (!nama || !umur || !jk || !hubungan) {
      alert("Nama, Umur, Jenis Kelamin, dan Hubungan harus diisi!");
      return;
    }

    // Update data di array pada index yang sedang diedit
    dataKeluarga[editingIndex] = {
      nama: nama,
      umur: umur,
      jk: jk,
      hubungan: hubungan,
      pekerjaan: pekerjaan,
      telp: telp,
      alamat: alamat,
    };

    // Simpan ke localStorage
    saveDataKeluarga();
    // Bersihkan form
    clearForm();
    // Render ulang tabel untuk menampilkan data yang sudah diubah
    renderTabelKeluarga();
  });

  // Handler: Tombol "Hapus" pada baris tabel diklik - hapus data
  $(document).on("click", ".btn-hapus-fam", function () {
    // Ambil index data dari atribut data-idx tombol
    let idx = $(this).data("idx");
    // Minta konfirmasi dari user sebelum menghapus
    if (confirm("Yakin hapus data ini?")) {
      // Hapus 1 item dari array berdasarkan index
      dataKeluarga.splice(idx, 1);
      // Simpan ke localStorage
      saveDataKeluarga();
      // Render ulang tabel (data yang dihapus tidak akan tampil)
      renderTabelKeluarga();
    }
  });

  // Handler: Tombol "Batal" diklik - bersihkan form tanpa menyimpan
  $(document).on("click", "#btn_batal_keluarga", function () {
    clearForm();
  });

  // Inisialisasi saat halaman pertama kali dibuka:
  // 1. Muat data dari localStorage
  loadDataKeluarga();
  // 2. Tampilkan tabel (meski kosong di awal)
  renderTabelKeluarga();
});

function normalNama(nama) {
  return nama.trim().toLowerCase().replace(/\s+/g, " ");
}

// initialize on DOM ready
$(document).ready(function () {
  // Custom dropdown code removed
});

$(document).ready(function () {
  $("#ambil").on("click", function () {
    let nama = $("#nama").val().trim();
    let umur = $("#umur").val();
    let jk = $("#jk").val();
    let alamat = $("#alamat").val().trim();
    let keluhan = $("#keluhan").val().trim();
    let poli = $("#poli").val();
    let info = $("#info");

    if (!nama || !umur || !alamat || !keluhan) {
      info.text("Semua data wajib diisi");
      return;
    }

    let regexNama = /^[A-Za-z\s]+$/;
    if (!regexNama.test(nama)) {
      info.text("Nama hanya boleh huruf, tanpa angka atau simbol");
      return;
    }

    nama = nama.toLowerCase().replace(/\b\w/g, (h) => h.toUpperCase());

    let data = getAntrian();
    let aktif = data.filter((p) => p.status !== "Selesai");

    let duplikatNama = aktif.find(
      (p) => normalNama(p.nama) === normalNama(nama)
    );

    if (duplikatNama) {
      info
        .removeClass("has-text-success")
        .addClass("has-text-danger")
        .text("Nama pasien sudah terdaftar");
      return;
    }

    if (aktif.length >= 10) {
      info.text("Antrian penuh, silakan tunggu");
      return;
    }

    let no = data.length ? data[data.length - 1].no + 1 : 1;

    data.push({
      no,
      nama,
      umur,
      jk,
      alamat,
      keluhan,
      poli,
      status: "Menunggu",
      waktu: new Date().toLocaleString(),
    });

    setAntrian(data);

    info
      .removeClass("has-text-danger")
      .addClass("has-text-success")
      .html(`Nomor Antrian Anda: <strong>${no}</strong>`);

    $("input, textarea").val("");
  });
});

$(document).ready(function () {
  $("#menuDashboard").on("click", function (e) {
    let isDokter = localStorage.getItem("dokterLogin");

    if (!isDokter) {
      e.preventDefault();

      let lanjut = confirm("Dashboard khusus dokter. Login sekarang?");

      if (lanjut) {
        window.location.href = "/Dokter/login.html";
      }
    }
  });
});

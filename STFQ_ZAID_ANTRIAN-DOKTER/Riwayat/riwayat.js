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

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dokterLogin") !== "true") {
    document.getElementById("btnHapus").style.display = "none";
  }
  renderRiwayat();
});

function renderRiwayat() {
  let data = getAntrian().filter(p => p.status === "Selesai");
  document.getElementById("riwayat").innerHTML = data.map(p => `
    <tr>
      <td>${p.no}</td>
      <td>${p.nama}</td>
      <td>${p.umur}</td>
      <td>${p.jk}</td>
      <td>${p.alamat}</td>
      <td>${p.keluhan}</td>
      <td>${p.poli}</td>
      <td>${p.status}</td>
      <td>${p.waktu}</td>
    </tr>
  `).join("");
}

function hapusRiwayat() {
  if (localStorage.getItem("dokterLogin") !== "true") {
    alert("Akses ditolak");
    return;
  }

  if (!confirm("Hapus semua riwayat?")) return;

  let sisa = getAntrian().filter(p => p.status !== "Selesai");
  setAntrian(sisa);
  renderRiwayat();
}

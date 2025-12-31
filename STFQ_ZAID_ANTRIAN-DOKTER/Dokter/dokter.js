if (localStorage.getItem("dokterLogin") !== "true") {
  alert("Akses hanya untuk dokter");
  window.location.replace("/Dokter/login.html");
}

function logout() {
  localStorage.removeItem("dokterLogin");
  window.location.href = "/HOME/index.html";
}

function render() {
  let list = document.getElementById("tabel");
  if (!list) return;

  let data = getAntrian();
  let html = "";

  data
    .filter(p => p.status !== "Selesai")
    .forEach(p => {
      html += `
        <tr>
          <td>${p.no}</td>
          <td>${p.nama || "-"}</td>
          <td>${p.umur || "-"}</td>
          <td>${p.jk || "-"}</td>
          <td>${p.alamat || "-"}</td>
          <td>${p.keluhan || "-"}</td>
          <td>${p.poli || "-"}</td>
          <td>${p.status || "-"}</td>
          <td>${p.waktu || "-"}</td>
          <td>
            ${
              p.status === "Menunggu"
                ? `<button class="button is-info is-small" onclick="panggil(${p.no})">Panggil</button>`
                : `<button class="button is-success is-small" onclick="selesai(${p.no})">Selesai</button>`
            }
          </td>
        </tr>`;
    });

  list.innerHTML = html;
}

function panggil(no) {
  if (getSedangDiperiksa()) {
    alert("Masih ada pasien yang diperiksa");
    return;
  }

  let data = getAntrian();
  data.forEach(p => {
    if (p.no === no) {
      p.status = "Diperiksa";
      p.waktu = new Date().toLocaleString();
    }
  });

  setAntrian(data);
  render();
}

function selesai(no) {
  let data = getAntrian();
  let item = data.find(p => p.no === no);
  if (item) item.status = "Selesai";

  setAntrian(data);
  render();
}

render();

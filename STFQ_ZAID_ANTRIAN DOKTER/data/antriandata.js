const STORAGE_KEY = "antrian";
const AUTH_KEY = "dokterLogin";

function getAntrian() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setAntrian(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getSedangDiperiksa() {
  return getAntrian().find(p => p.status === "Diperiksa");
}
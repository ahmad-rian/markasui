// Dipisah dari script framework agar kelas .dark terpasang sebelum render pertama.
const theme = new URLSearchParams(location.search).get("theme");
document.documentElement.classList.toggle("dark", theme === "dark");

// Selecciona el botón y el menú
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

// Agrega un evento de clic al botón
menuToggle.addEventListener('click', () => {
    // Alternar la clase active para mostrar u ocultar el menú
    navList.classList.toggle('active');
});

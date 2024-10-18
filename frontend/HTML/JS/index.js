document.getElementById("menuToggle").addEventListener("click", function() {
    const navList = document.getElementById("navList");
    const body = document.body;
  
    // Alternar la visibilidad del menú
    navList.classList.toggle("show");
  
    // Activar/desactivar el scroll en el cuerpo de la página
    if (navList.classList.contains("show")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  });
  
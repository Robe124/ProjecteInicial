window.addEventListener('scroll', function() {
    const background = document.querySelector('.background');
    const scrollPosition = window.scrollY;

    // Umbral donde el difuminado comienza (puedes ajustarlo)
    const threshold = 200; 

    // Si se supera el umbral de desplazamiento, aplica la clase "blurred"
    if (scrollPosition > threshold) {
        background.classList.add('blurred');
    } else {
        background.classList.remove('blurred');
    }
});

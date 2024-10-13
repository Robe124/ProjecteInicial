window.addEventListener('scroll', function() {
    const background = document.querySelector('.background');
    const scrollPosition = window.scrollY;
    const threshold = 200;

    if (scrollPosition > threshold) {
        background.classList.add('blurred');
    } else {
        background.classList.remove('blurred');
    }
});

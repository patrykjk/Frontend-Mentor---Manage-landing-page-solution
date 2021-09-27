document.addEventListener('click', e => {
    if (e.target.matches('.menu-open-btn')) document.body.classList.add('menu-active')

    if (e.target.matches('.nav-overlay') ||
        e.target.matches('.menu-close-btn')) document.body.classList.remove('menu-active')
})
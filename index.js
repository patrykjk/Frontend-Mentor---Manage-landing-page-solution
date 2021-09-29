let slideTemplate = document.querySelector('[data-id="testimonials-slide-template"]')
let slidesContainer = document.querySelector('.slides-container')
let sliderDots = document.querySelector('.current-slide-indicator')
let currentSlideIndex = 0
let touchstartEventPositionX = 0
let touchstartSliderPositionX = 0

let slidesArray = [
    {
        author: 'Anisha Li',
        img: 'images/avatar-anisha.png',
        quote: '“Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.”',
    },
    {
        author: 'Ali Bravo',
        img: 'images/avatar-ali.png',
        quote: '“We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.”',
    },
    {
        author: 'Richard Watts',
        img: 'images/avatar-richard.png',
        quote: '“Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!”',
    },
    {
        author: 'Shanai Gough',
        img: 'images/avatar-shanai.png',
        quote: '“Their software allows us to track, manage and collaborate on our projectsfrom anywhere. It keeps the whole team in-sync without being intrusive.”',
    },
]




let renderSlider = () => {
    slidesArray.forEach((slide, index) => {
        let newSlide = slideTemplate.content.cloneNode(true).children[0]
        newSlide.setAttribute('data-id', index)
        newSlide.querySelector('.avatar').src = slide.img
        newSlide.querySelector('.author').innerText = slide.author
        newSlide.querySelector('.quote').innerText = slide.quote

        let input = document.createElement('input')
        input.type = 'radio'
        input.name = 'slide-index'
        input.tabIndex = '-1'
        input.setAttribute('data-id', index)

        if (index === 0) {
            newSlide.classList.add('active')
            input.checked = true
        }

        let circle = document.createElement('div')

        slidesContainer.append(newSlide)
        sliderDots.append(input, circle)
    })
}


let showSlide = index => {
    if (index >= slidesArray.length || index < 0) index = 0
    currentSlideIndex = index

    let slideWidth = slidesContainer.querySelector('.testimonials-slider-item').clientWidth
    slidesContainer.style.setProperty('--position', `${slideWidth * index}`)

    sliderDots.querySelector(`[data-id="${index}"]`).checked = true

    slidesContainer.querySelector('.active').classList.remove('active')
    slidesContainer.querySelector(`[data-id="${index}"]`).classList.add('active')
}


let showNextSlide = () => {
    showSlide(currentSlideIndex + 1)
}







document.addEventListener('click', e => {
    if (e.target.matches('.menu-open-btn')) document.body.classList.add('menu-active')

    if (e.target.matches('.nav-overlay') ||
        e.target.matches('.menu-close-btn')) document.body.classList.remove('menu-active')

    if (e.target.matches('.testimonials-slider-item:not(.active) *') ||
        e.target.matches('.testimonials-slider-item:not(.active)')) {
        clearInterval(autoShowNextSlide)
        showSlide(parseInt(e.target.closest('.testimonials-slider-item').dataset.id))
        autoShowNextSlide = setInterval(showNextSlide, 7777)
    }
})


slidesContainer.addEventListener('touchstart', e => {
    touchstartEventPositionX = e.touches[0].clientX
    touchstartSliderPositionX = parseInt(getComputedStyle(slidesContainer).getPropertyValue('--position'))
    slidesContainer.classList.add('no-animation')

    clearInterval(autoShowNextSlide)
})


slidesContainer.addEventListener('touchmove', e => {
    let currentEventPositionX = e.touches[0].clientX
    let movedBy = touchstartEventPositionX - currentEventPositionX

    if (Math.abs(movedBy) > 22) {
        e.preventDefault()
    }

    slidesContainer.style.setProperty('--position', touchstartSliderPositionX + (movedBy / 2))
})


slidesContainer.addEventListener('touchend', e => {
    slidesContainer.classList.remove('no-animation')
    let touchendPositionX = e.changedTouches[0].clientX

    if (touchstartEventPositionX - touchendPositionX > 33) {
        showNextSlide()
    } else if (touchendPositionX - touchstartEventPositionX > 33) {
        showSlide(currentSlideIndex - 1)
    } else {
        showSlide(currentSlideIndex)
    }

    autoShowNextSlide = setInterval(showNextSlide, 7777)
})


window.addEventListener('resize', () => showSlide(currentSlideIndex))







renderSlider()

let autoShowNextSlide = setInterval(showNextSlide, 7777)
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

window.addEventListener('scroll', reveal);

function reveal(){
    const reveals = document.querySelectorAll('.reveal');
    const reveals_r = document.querySelectorAll('.reveal-r');
    const reveals_l = document.querySelectorAll('.reveal-l');

    var revealpoint = 50;
    var windowHeight = window.innerHeight;

    for (var i = 0; i < reveals.length; i++){
        var revealTop = reveals[i].getBoundingClientRect().top;

        if (revealTop < windowHeight - revealpoint){
            reveals[i].classList.add('active');
        } 
        else {
            reveals[i].classList.remove('active');
        }
    }

    for (var i = 0; i <  reveals_r.length; i++){
        var revealTop_r =  reveals_r[i].getBoundingClientRect().top;

        if (revealTop_r < windowHeight - revealpoint){
            reveals_r[i].classList.add('active');
        } 
        else {
            reveals_r[i].classList.remove('active');
        }
    }

    for (var i = 0; i < reveals_l.length; i++){
        var revealTop_l = reveals_l[i].getBoundingClientRect().top;

        if (revealTop_l < windowHeight - revealpoint){
            reveals_l[i].classList.add('active');
        } 
        else {
            reveals_l[i].classList.remove('active');
        }
    }
}

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls){
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery(){
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        this.carouselArray.slice(0,5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`);
        });
    }

    setCurrentState(direction){
        if (direction.className == 'gallery-controls-previous'){
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls(){
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
        })
    }

    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            })
        })
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();

setInterval(() => {
    setInterval(exampleCarousel.setCurrentState('none'));    
}, 10000);
function hidePopup(){
    let popup = document.getElementById('gallery-preview');
    popup.classList.remove('visible'); //za izlazak iz zumirane slike,x 
}

function init(){
    bindGalleryItem();
    bindKeydown();
}

function bindGalleryItem(){
    let images = document.querySelectorAll('.gallery a');

    let index = 0;
    for (let image of images){
        image.addEventListener('click', showImage);
        image.dataset.index = index;
        index++;
    }
}

function showImage(event){
    event.preventDefault(); //sprecavanje normalnog ponasanja nad slikom, nece se otvoriti u novom tabu slika

    let link = event.target.parentElement.href;

    let index = event.target.parentElement.dataset.index;

    let image = document.querySelector('#gallery-preview img');

    image.src = link;

    let popup = document.getElementById('gallery-preview');
    popup.dataset.currentindex = index; //upisivanje elementa
    popup.classList.add('visible');
    
    //console.log(event.target); //mesto nad kojem se dogodio klik, u koznoli ce otvorit sliku
}

function bindKeydown(){
    window.addEventListener('keydown', keyDownHandler) //pokretanje kada kliknemo na esc 
}

function keyDownHandler(event){
    switch(event.key){
        case "escape":
            hidePopup();
            break;
        case "ArrowRight":
            showNextImage();
            break; 
            case "ArrowLeft":
            showPreviousImage();
            break;    
    }
}

function showNextImage(){
    let popup = document.getElementById('gallery-preview');
    let currentindex = popup.dataset.currentindex;

    currentindex++;

    let images = document.querySelectorAll('.gallery a');    

    currentindex = currentindex % images.length;

    let link = images[currentindex].href;
    let image = popup.querySelector('img');

    image.src = link;

    popup.dataset.currentindex = currentindex;
    popup.classList.add('visible');
}

function showPreviousImage(){
    let popup = document.getElementById('gallery-preview');
    let currentindex = popup.dataset.currentindex;
    let images = document.querySelectorAll('.gallery a');

    currentindex --;

    if(currentindex < 0){
        currentindex = images.length - 1;
    }
    let link = images [currentindex].href;

    let image = popup.querySelector('img');
    image.src = link;

    popup.dataset.currentindex = currentindex;
    popup.classList.add('visible');
}

window.addEventListener('load', init);

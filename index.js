$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Letovanja", "Zimovanja", "Ekskurzije", "Izleti"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Letovanja", "Zimovanja", "Ekskurzije", "Izleti"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});


//tags

function createTagInput(root){
    root.classList.add('tags'); //dodavanje klase

    let list = document.createElement('div');
    list.classList.add('list');

    root.appendChild(list);

    let input = document.createElement('input');
    root.appendChild(input);

    root.addEventListener('click', function(){
        input.focus();//kada kliknem na root fokusiraj input
    });

    input.addEventListener('keyup', function(){
        let text = input.value.trim();  //prover koji je poslednji karakter
        
        if(text.endsWith(',')){ //ako se zavrsava zarezom
            let udm1 = text.length - 1;
            let baseText = text.substring(0, udm1);

            let tag = document.createElement('span'); //formiranje span elementa
            tag.classList.add('tag');
            tag.dataset.text = baseText;
            tag.innerText = baseText;

            let x = document.createElement('button');
            x.innerText= 'x';
            x.addEventListener('click', function(){
                tag.remove();
            });

            tag.appendChild(x);

            list.appendChild(tag);

            input.value ='';
        }
    });

    input.addEventListener('keydown', function(event){
        if(event.key !== 'Backspace'){
            return;
        }

        if(input.value.trim().length >0){
            return;
        }

        if(list.children.length == 0){
            return;
        }
        list.children[list.children.length-1].remove();
    });

    root.getTags = function(){
       let tagovi = [] 

        for (let tagElement of list.children){
            tagovi.push(tagElement.dataset.text); //dodavanje

        }
        return tagovi;
       };

       root.clear = function() {
           list.innerText = '';
           input.value = '';
       };
    
}

//skladisttenje podataka
function init(){
    let slozioSe = localStorage.getItem('slozioSe'); //iscitavanje vrednosti


    if(slozioSe === null){
        prikaziCuvanjePodatakaPopup();
    
    }
    

    let boja = localStorage.getItem('boja');

    if(boja === null){
        boja = '#000000';
    }

    document.getElementById('bojaTeksta').value = boja;
    
    document.querySelector('body').style.color = boja;
}

window.addEventListener('load', init);

function izvTags(){
    
}

function prikaziCuvanjePodatakaPopup(){
    let d = document.getElementById('cuvanjePodataka');
    let a = document.getElementById('izvuceni-tagovi');
    d.classList.remove('hidden'); //uklanjanje klase hidden
    d.classList.remove('hidden');
}

function sakrijiCuvanjePodatakaPopup(){
    let d = document.getElementById('cuvanjePodataka');
    d.classList.add('hidden'); //dpdavanje klase hidden
}

function slazemSe(){
    localStorage.setItem('slozioSe', 'true') ;//objekat koji u sebi ima funkciju setItem koja uzima dve vrednosti
    

    sakrijiCuvanjePodatakaPopup();
    
    alert("Vasi podaci su sacuvani");
}

function neSlazemSe(){
    localStorage.removeItem('slozioSe') //pokrenuce brisanje itema pod kljucem slozio se

    window.location = 'https://google.com/'; //preusemravanje korisnika
}

function promenjenaBoja(){
    let stara = document.querySelector('body').style.color;
    let nova = document.getElementById('bojaTeksta').value;

    if(stara == nova){
        return;
    }

    document.querySelector('body').style.color = nova;

    localStorage.setItem('boja', nova);
}

function resetSvega(){
    localStorage.clear(); //brisanje svega iz storage

    window.location.reload(); //sve ispocetka
}

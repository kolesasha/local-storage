const API ='https://api.npoint.io/4c25afeb223fda034bec';

function init(){ //inicijalizacija
    fetch(API)
    .then(res => res.json())
    .then(data => showProizvodi(data)); //podatke iz json prosledjuje novoj funkciji
}

function showProizvodi(proizvodi){
    for (let proizvod of proizvodi){
        addProizvod(proizvod);
    }
}

function addProizvod(proizvod){
    let template = document.getElementById('template-article');
    //kloniranje sadrzaja 
    let instance = template.content.cloneNode(true);

    instance.querySelector('img').setAttribute('src', proizvod.image) //trazenje slike
    instance.querySelector('a').innerText = proizvod.title;
    
    if(!proizvod.energy){
        instance.querySelector('.energy').innerText ='';
    }else{
        instance.querySelector('.energy').innerText = proizvod.energy +'kcal';
    }

    instance.querySelector('.price').innerText = proizvod.price +'Din.';

    if(proizvod.new == false){
        instance.querySelector('.novo').style.display = 'none';
    }
    document.querySelector('.proizvodi').appendChild(instance);
}


window.addEventListener('load', init)


const popup = document.querySelector('#popup');    
const gameTable = document.querySelector('#gameTable');
const sonuc = document.querySelector('#sonuc');
function Secim(){
    popup.style.visibility = "visible";
    gameTable.style.visibility = "hidden";    
    popup.addEventListener('click',function(e){
        if(e.target.classList=='btn'){
            Oyun(e.target.textContent);
            popup.remove();
            gameTable.style.visibility="visible";
        }

    });        
}
function OyunTablo(oyuncu,rakip){

    gameTable.addEventListener('click',function(e){
        if(e.target.classList=="col"){
            e.target.textContent = oyuncu.secilen;
            TabloTarama(rakip.secilen);
        }
    });

}
function MacSonucu(kazanan){
    gameTable.remove();
    sonuc.style.visibility="visible";

    let html=
    `
     <div class="head">
            <h1 class="sonuc-head">Kazanan ${kazanan}</h1>
            <button class="btn btn-sonuc" id="sonuc-button">Tekrar Oyna</button>    
    </div>
    `;
    sonuc.innerHTML=html;

    sonuc.addEventListener('click',(e)=>{
        console.log(e.target);
        if(e.target.getAttribute('id')=="sonuc-button"){
            location.reload();
        }
    });
}

let cols = document.getElementsByClassName("col");







function hepsiMi(t){

    let objX = {
        sayacX:0,
        kazanan:"X"
    };
    let objO = {
        sayacO:0,
        kazanan:"O"
    };


    for(let i =0;i<t.length;i++){
        if(t[i].textContent=='X'){

            objX.sayacX++;        
        }
        if(t[i].textContent=='O'){
            objO.sayacO++;  
        }

    }
    if(objX.sayacX==3){

        return objX.kazanan;
    }
    else if(objO.sayacO==3){

        return objO.kazanan;        
    }
    else{
        return "";
    }
}


function Kontrol(item,rakip){

}

function bosHucreler(){
    let hucre = [cols[0],cols[1],cols[2],cols[3],cols[4],cols[5],cols[6],cols[7],cols[8]];
    let bHucre = [];

    for(let i =0;i<hucre.length;i++){
        if(hucre[i].textContent==''){
            bHucre[i]=hucre[i];
        }
    }
    return bHucre;
}


function randomContent(){
    let bHucre = bosHucreler();
    
    let random = Math.floor(Math.random()*9);
    let index = bHucre.indexOf(bHucre[random],0);
    for(let i =0;i<9;i++){
        if(index!=-1){
            return bHucre[index];
        }                        
        else{
            let random = Math.floor(Math.random()*9);
            index = bHucre.indexOf(bHucre[random],0); 
        }
    }
    
  
}
function acilDurumKontrol(item){
    let countX =0;
    let countO =0;
   // console.log(item);
    for(let i =0;i<item.length;i++){
        if(item[i].textContent=='X'){
            countX++;
        }
        if(item[i].textContent=='O'){
            countO++;
        }
    }
    if(countX==2 || countO==2){
        for(let i =0;i<item.length;i++){
            if(item[i].textContent==''){
                return item[i];
            }
        }
    }

}
function acilDurum(){
    let colYatay = 
    [
        [cols[0],cols[1],cols[2]],
        [cols[3],cols[4],cols[5]],
        [cols[6],cols[7],cols[8]]

    ];
    let colDikey = 
    [
        [cols[0],cols[3],cols[6]],
        [cols[1],cols[4],cols[7]],
        [cols[2],cols[5],cols[8]]

    ];
    let colCapraz = 
    [
        [cols[0],cols[4],cols[8]],
        [cols[2],cols[4],cols[6]],
        []

    ];

    for(let i =0;i<3;i++){
        let adkYatay = acilDurumKontrol(colYatay[i]);
        let adkDikey = acilDurumKontrol(colDikey[i]);
        let adkCapraz = acilDurumKontrol(colCapraz[i]);
        if(adkYatay!=undefined){
            return adkYatay;
        }
        else if(adkDikey!=undefined){
            return adkDikey;
        }
        else if(adkCapraz!=undefined){
            return adkCapraz;
        }
    }    

}

function TabloTarama(rakip){
    setInterval(tablo,500);
    let durum = acilDurum();
    if(durum!=undefined){
        durum.textContent=rakip;
    }
    else{
        let sRandom = randomContent();

        if(sRandom!=undefined){
            sRandom.textContent=rakip;
        }    
    }
}





function tablo(){

    let rowsHorizontal = 
    [
        [cols[0],cols[1],cols[2]],
        [cols[3],cols[4],cols[5]],
        [cols[6],cols[7],cols[8]],

    ];
    let rowsVertical = 
    [
        [cols[0],cols[3],cols[6]],
        [cols[1],cols[4],cols[7]],
        [cols[2],cols[5],cols[8]],

    ];
    let rowsCross = 
    [
        [cols[0],cols[4],cols[8]],
        [cols[2],cols[4],cols[6]]
    ];

    for(let i =0;i<cols.length;i++){
        if(cols[i].childNodes.length>0){
            cols[i].disabled = "true";
        }
    } 

    let kazanan;    
    rowsHorizontal.forEach(item=>{
        if(hepsiMi(item)=='O' || hepsiMi(item)=='X'){
            kazanan=hepsiMi(item);
        }
    });
    rowsVertical.forEach(item=>{
        if(hepsiMi(item)=='X' || hepsiMi(item)=='O'){
            kazanan=hepsiMi(item);

        }
    });     
    rowsCross.forEach(item=>{
        if(hepsiMi(item)=='X' || hepsiMi(item)=='O'){
            kazanan=hepsiMi(item);
        }
    });
    

    if(kazanan=='X' || kazanan=='O'){
        tabloOldur(cols);

        setTimeout(()=>{
            MacSonucu(kazanan);
        },1000);
    }
    let count =0;
    for(let i =0;i<cols.length;i++){
        if(cols[i].textContent!=''){
            count++;
        }
    }
    if(count==9){
        tabloOldur(cols);
        setTimeout(()=>{
            MacSonucu("Berabere");
        },1000);

    }
}


function tabloOldur(cols){
    gameTable.style.opacity="0.2";        
    for(let i =0;i<cols.length;i++){
        cols[i].disabled="true";

    }        
}

function Oyuncu(secilen){
    this.secilen = secilen;

}

Oyuncu.prototype.secilenDeger = function(){

    return this.secilen;
}

function Rakip(secilen){
    if(secilen=='X'){
        this.secilen = 'O';
    }
    else{
        this.secilen = 'X';
    }
}
Rakip.prototype.secilenDeger = function(){

    return this.secilen;
}


function Oyun(secilen){
    if(secilen!=undefined){
        let oyuncu = new Oyuncu(secilen);
        let rakip = new Rakip(oyuncu.secilenDeger());        
        let tablo = new OyunTablo(oyuncu,rakip);
    }
    
}
Oyun.prototype.calis = function(){
    let secim  = new Secim();
    
}

let oyun = new Oyun();
oyun.calis();


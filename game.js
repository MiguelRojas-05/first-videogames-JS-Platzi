const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');
const buttonEmpezar = document.querySelector('.botonEmpezar');
const presentacion = document.querySelector('.presentacion');
const reiniciar = document.querySelector('.REINICIAR');
const btnReiniciar = document.querySelector('#btn__reiniciar');

btnReiniciar.addEventListener('click', ()=>{
    presentacion.classList.add('despejar')
    window.location.reload();
})

buttonEmpezar.addEventListener('click',()=>{
    presentacion.classList.add('despejar');
    timeStart = Date.now();
    timeInterval = setInterval(showTime,100);
    starGame();
    showRecord();
})

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeInterval;
let timePlayer;
let timeStart;

const playerPosition ={
    x: undefined,
    y: undefined,
};

const giftPosition={
    x: undefined,
    y: undefined,
};

let enemiesPosition = [];

function starGame(){  

//console.log({canvasSize, elementsSize});

game.font = elementsSize+'px Verdana';
game.textAlign = "start";

const map = maps[level];
   

const mapRows = map.trim().split('\n');
const mapRowCols = mapRows.map(row => row.trim().split(""));
//console.log(mapRowCols);
/*
Tenemos otro codigo que hace lo mismo que el codigo de convertir string de mapas en arreglo bidimensional:

const map = maps[0]
.match(/[IXO\-]+]/g)
.map(a=>a.split(""))

el match ayuda a buscar string que empiecen por I,X,O,\n y devolverá cada string a partir de ello, además 
hara un salto al termino de este. y luego se usa el map() que ya conocemos como funciona.
*/
showLives();

enemiesPosition = []

game.clearRect(0,0,canvasSize,canvasSize);

mapRowCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex)=>{
        const emoji = emojis[col];
        const posX =elementsSize*(colIndex);
        const posY =elementsSize*(rowIndex+1);
        if(col == 'O'){
            if(!playerPosition.x && !playerPosition.y){
                playerPosition.x = posX;
                playerPosition.y = posY;
                // console.log({playerPosition});
            }
        }else if(col == 'I'){
            giftPosition.x = posX;
            giftPosition.y = posY;
            // console.log({giftPosition});
        }else if(col == 'X'){
            enemiesPosition.push({
                x: posX,
                y: posY,
            })
        }


        game.fillText(emoji,posX,posY);
    })
});

movePlayer();
//window.innerHeight
//window.innerWidth

    /*
    game.fillRect(0,0,100,100);
    game.clearRect(10,30,80,40);

    game.font='25px Verdana';
    game.fillStyle='purple';
    game.textAlign = 'center';
    game.fillText('platzi',50,50)*/
}



function movePlayer(){
    const giftColisionX= parseInt(playerPosition.x)  ==   parseInt(giftPosition.x) ;
    const giftColisionY= parseInt(playerPosition.y) == parseInt(giftPosition.y) ;
    const giftColision = giftColisionX && giftColisionY;
    if(giftColision){
        console.log('Se ejecuta siguiente nivel');
        levelWin();
    }
    const enemyColision = enemiesPosition.find(enemy=>{
        const enemyColisionEnX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyColisionEnY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyColisionEnX && enemyColisionEnY;
    });
    if(enemyColision){
        levelFail();
    }
    game.fillText(emojis['PLAYER'],playerPosition.x ,playerPosition.y); 
}

function levelWin(){
    if(level>=2){
        gameWin();
    }else{
        level++;
        starGame();
    }
    
}

function levelFail(){
    lives--;
    
    if(lives<=0){
        level = 0;
        lives = 3;
        window.location.reload();
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    starGame();
}

function gameWin(){
    clearInterval(timeInterval);

    const playerTime = Date.now()-timeStart;
    const recordTime = localStorage.getItem('record_time');
    reiniciar.classList.remove('despejar');

    if(recordTime){
        
        if(recordTime>=playerTime){
            localStorage.setItem('record_time',playerTime);
            result.innerHTML = "Felicidades, superaste el record anterior";
        }else{
            result.innerHTML = "Lo siento no superaste el record anterior";
        }
    }else{
        localStorage.setItem('record_time', playerTime);
    }
    console.log({recordTime,playerTime});
}

function showLives(){
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}
function showTime(){
    spanTime.innerHTML = Date.now()-timeStart;
}
function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time');
}
function setCanvasSize(){
    
    if(window.innerHeight>window.innerWidth){
        canvasSize = parseInt(window.innerWidth * 0.8);
    }else{
        canvasSize = parseInt(window.innerHeight * 0.8);
    }
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize =  (canvasSize/10)-2;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    starGame();
}

window.addEventListener("keydown", moveByKeys);
const btnUp = document.getElementById("up");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const btnDown = document.getElementById("down");

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

    function moveUp() {
    console.log("Me movere hacia arriba");
    if((playerPosition.y - elementsSize)+1<elementsSize){
        console.log("OUT");
    }else{
        playerPosition.y -= elementsSize;
        starGame();
    }
  }
  
  function moveLeft() {
    console.log("Me movere hacia izq");
    if((playerPosition.x - elementsSize)+1<0){
        console.log("OUT");
    }else{
        playerPosition.x -= elementsSize;
        starGame();
    }
    
  }
  
  function moveRight() {
    console.log("Me movere hacia dere");
    if(( elementsSize*8-playerPosition.x)<0){
        console.log("OUT");
    }else{
        playerPosition.x += elementsSize;
        starGame();
    }
  }
  
  function moveDown() {
    console.log("Me movere hacia aba");
    if(( elementsSize*9-playerPosition.y)<0){
        console.log("OUT");
    }else{
        playerPosition.y += elementsSize;
        starGame();
    }
  }

function moveByKeys(e){
    switch(e.key){
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
    }
}
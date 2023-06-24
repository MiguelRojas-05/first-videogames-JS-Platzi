const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

let canvasSize;
let elementsSize;
const playerPosition ={
    x: undefined,
    y: undefined,
}

function starGame(){  

//console.log({canvasSize, elementsSize});

game.font = elementsSize+'px Verdana';
game.textAlign = "start";

const map = maps[0];
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
                console.log({playerPosition});
            }
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
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y); 
}

function setCanvasSize(){
    
    if(window.innerHeight>window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }
 
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize =  (canvasSize/10)-1;

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
    playerPosition.y -= elementsSize;
    starGame();
  }
  
  function moveLeft() {
    console.log("Me movere hacia izq");
    playerPosition.x -= elementsSize;
    starGame();
  }
  
  function moveRight() {
    console.log("Me movere hacia dere");
    playerPosition.x += elementsSize;
    starGame();
  }
  
  function moveDown() {
    console.log("Me movere hacia aba");
    playerPosition.y += elementsSize;
    starGame();
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
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
window.addEventListener('load',starGame);

function starGame(){
    let canvasSize;

    if(window.innerHeight>window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }
 
canvas.setAttribute('width',canvasSize);
canvas.setAttribute('height',canvasSize);

const elementsSize = (canvasSize/10)-1  ;

console.log({canvasSize, elementsSize});

game.font = elementsSize+'px Verdana';
game.textAlign = "";

for (let i = 0; i < 10; i++) {
    game.fillText(emojis['X'],elementsSize*i,elementsSize);    
}

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
let canvasSize;

canvas.setAttribute('width',canvasSize);
canvas.setAttribute('height',canvasSize);

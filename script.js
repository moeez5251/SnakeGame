let board=document.querySelector('.main');
let eating=new Audio('img/eating.mp3');
let game_over=new Audio('img/gameover.mp3');
let music=new Audio('img/snake_music.mp3');
let move=new Audio('img/move.mp3');
let number=document.querySelector('.number');
let high=document.querySelector('.highnumber');
let lastPaintTime = 0;
let speed=9;
let snake=[{x:8,y:15}];
let inputDir = {x: 0, y: 0}; 
let food={x:9,y:10}
let score=0;
let highscorevalue=0;
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
    function iscollide(sankearr) {
        for(let i=1;i<snake.length;i++){
            if (snake[0].x===snake[i].x&&snake[0].y===snake[i].y) {
                return true;
            }
        }
        if (snake[0].x>21|| snake[0].x<0||snake[0].y>33||snake[0].y<0) {
            return true;
        }
        return false;
    }

    
    function gameEngine() {
        let highscore=localStorage.getItem('xheikhSnake');
if (highscore===null) {
    highscorevalue=0;
    localStorage.setItem('xheikhSnake',JSON.stringify(highscorevalue));
}
else{
    highscorevalue=JSON.parse(highscore);
    high.innerHTML=highscorevalue;
}
        if (iscollide(snake)) {
            music.pause();
            game_over.play();
            inputDir = {x: 0, y: 0}; 
            alert("Game Over. Press any key to play again!");
            snake = [{x: 8, y: 15}];
            music.play();
            score = 0; 
            number.innerHTML=score;
        }
        
        if (snake[0].x===food.x&&snake[0].y===food.y) {
        eating.play();
        score++;
        if (score>highscorevalue) {
            highscorevalue=score;
            localStorage.setItem('xheikhSnake',JSON.stringify(highscorevalue));
            high.innerHTML=highscore;
        }
        snake.unshift({x:snake[0].x+inputDir.x,y: snake[0].y+inputDir.y});
        let a=5;
        let b=20;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(b+(11)*Math.random())}
        number.innerHTML=score;
    }
    for (let i = snake.length - 2; i>=0; i--) { 
        snake[i+1] = {...snake[i]};
        
    }
        snake[0].x += inputDir.x;
        snake[0].y += inputDir.y

    board.innerHTML='';
    snake.forEach((e,index)=>{
    let new_Element=document.createElement('div');
    new_Element.style.gridRowStart=e.x;
    new_Element.style.gridColumnStart=e.y;
    if (index===0) {
        new_Element.classList.add('head');
    }
    else{
        new_Element.classList.add('snake');
    }
    board.appendChild(new_Element);
})
let food_element=document.createElement('div');
food_element.classList.add('food');
food_element.style.gridRowStart=food.x;
food_element.style.gridColumnStart=food.y;
board.appendChild(food_element);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    music.play();
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = -1;
            inputDir.y = 0;
            move.play();
            break;
            
            case "ArrowDown":
                inputDir.x = 1;
                inputDir.y = 0;
                move.play();
                break;
                
                case "ArrowLeft":
            inputDir.x = 0;
            inputDir.y = -1;
            move.play();
            break;

        case "ArrowRight":
            inputDir.x = 0;
            inputDir.y = 1;
            move.play();
            break;
        default:
            break;
    }
});
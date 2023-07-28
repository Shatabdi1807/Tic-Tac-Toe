console.log("Welcome to tic tac toe")
let turnAudio = new Audio("ding-36029.mp3")
let turn = "X"
let gameOver = false;

//Function to check the turn
const changeTurn = () => {
    return turn === "X" ? "0": "X"
}

//Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, 135],
    ]
    wins.forEach(e => {
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won"
            gameOver = true
            //document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = "200px"
            document.querySelector('.line').style.width = "30vw"
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            
        }
    })
}

//Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener('click', () => {
        if(gameOver){
            return
        }
        else if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            turnAudio.play();
            checkWin();
            checkDraw();
            if(!gameOver)
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    })
})

const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let filledBoxes = 0;

    // Count the number of moves made
    for (let i = 0; i < boxtext.length; i++) {
        if (boxtext[i].innerText !== '') {
            filledBoxes++;
        }
    }

    // If all boxes are filled but no player has won, it's a draw
    if (filledBoxes === boxtext.length && !gameOver) {
        document.querySelector('.info').innerText = "It's a draw!";
        gameOver = true;
    }
}

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    gameOver = false
    document.querySelector('.line').style.width = "0vw"
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = "0px"
})

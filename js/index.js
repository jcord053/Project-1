const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const cardSet = document.querySelectorAll('.card');
const startingPoints = document.getElementById('points').innerHTML;
const startingTime = document.getElementById('countdown').innerHTML;
const updatedPoints = document.querySelector('.points span');
const updatedTime = document.querySelector('.time span');


let cardOne;
let cardTwo;
let isItFlipped = false;
let locking = false;
let points = Number(startingPoints);
let time = Number(startingTime);



window.addEventListener('load', shuffleCards);


//cardSet.forEach(card => card.addEventListener('click', game));
startBtn.addEventListener('click', start);
//pauseBtn.addEventListener('click', start);
restartBtn.addEventListener('click', restart);









function start() {


    cardSet.forEach(card => card.addEventListener('click', game));

    const countdownInterval = setInterval(countdown, 1000);

    function countdown() {
        time = time - 1;
        updatedTime.innerHTML = time;

        if (time == 0) {
            countdownStopLose(countdownInterval);
        };
        
        
    };
    
    startBtn.removeEventListener('click', start);
    






function game() {

    if (locking) {
        return;
    }

    if (this === cardOne) {
        return;
    }
   
    this.classList.add('flipping');


    if (!isItFlipped) {

        isItFlipped = true;
        cardOne = this;

    } else {
        isItFlipped = false;
        cardTwo = this;



        if (cardOne.dataset.sport === cardTwo.dataset.sport) {
            
            cardOne.removeEventListener('click', game);
            cardTwo.removeEventListener('click', game);

            cardOne = null;
            cardTwo = null;
            locking = false;
            isItFlipped = false;
            points = points + 1;
            updatedPoints.innerHTML = points;
            

           win(countdownInterval);
    
            
        
            

    } else {

        locking = true;

        setTimeout(() => {

            cardOne.classList.remove('flipping');
            cardTwo.classList.remove('flipping');

            cardOne = null;
            cardTwo = null;
            locking = false;
            isItFlipped = false;
            
        }, 2000);
        

    }
};
};



};







function win(interval) {
    if (points == 8) {
        setTimeout(() => {
            window.alert(`You won! Press RESTART to play again!`);
         }, 1000);

        clearInterval(interval);
         
        
    }
}

function lost() {
    window.alert(`You ran out of time! Your score was ${points} points. Press RESTART to try again!`);
}


function countdownStopLose(interval) {
    clearInterval(interval);
    cardSet.forEach(card => card.removeEventListener('click', game));
    lost();
};




function shuffleCards () {
    console.log(cardSet)

    for (let i = 0; i < cardSet.length; i++) {

        let placement = 0;

        placement = Math.floor(Math.random() * cardSet.length);

        cardSet[i].style.order = placement;

    }
    
};



function restart() {

    location.reload();

};








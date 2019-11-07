//Grab inject elements
let inject = document.getElementById('inject');
let g2Menu = document.getElementById('g2Menu');


//Inject from TITLE screen to MENU screen
g2Menu.addEventListener('click', function (e) {
    //call loadJSON to inject HTML
    loadJSON("../menu_screen.html");
});

function loadJSON(url) {
    //load our JSON Data
    //XML HTTP-REQUEST

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);
            console.log(myArr);
            if (url === "../menu_screen.html") {
                menuScreenLoad(myArr);
            }
            else if (url === "../game_screen.html") {
                gameScreenLoad(myArr);
            }
            else if (url === "../options_screen.html") {
                optionsScreenLoad(myArr);
            }
            else if (url === "../data.data.json") {
                loadEZQ(myArr);
            }

        }
    };
    //Opening the connection
    xmlhttp.open("GET", url, true);
    //Sending the request
    xmlhttp.send();
}

function menuScreenLoad(info) {
    //going to load Menu Screen html elements and click events
    inject.innerHTML = info;

    //add in elements and event listeners
    let playEZBtn = document.getElementById('playEZ');
    let playMedBtn = document.getElementById('playMed');
    let playHrdBtn = document.getElementById('playHrd');
    let optionsScreen = document.getElementById('playOpts');

    playEZBtn.addEventListener('click', function (e) {
        loadJSON("../game_screen.html");
        loadJSON("../data.data.json");
    });
    playMedBtn.addEventListener('click', function (e) {
        loadJSON("../game_screen.html");

    });
    playHrdBtn.addEventListener('click', function (e) {
        loadJSON("../game_screen.html");

    });
    optionsScreen.addEventListener('click', function (e) {
        loadJSON("../options_screen.html");

    });
}

let ezQ = [];
//Function is called inside HTTP Request
function loadEZQ(info) {
    //Setup our Objects for the game
    //Moving over to questions to stop typing in info
    ezQ = info.ezQ;
    displayQuestion();
}

function gameScreenLoad(info) {
    inject.innerHTML = info;

    //add in elements and event listeners
    //Grab all the buttons
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let score = document.getElementById('score');

    let startgame = document.getElementById('startgame');
    startgame.addEventListener('click', function (e) {
        displayQuestion();
    });
    // Grab Class By Name
    // Returns an Array of HTML Elements
    let btns = document.getElementsByClassName('ansBtn');
    let disQ = document.getElementById('qL');
    let counter = document.getElementById('counter');
    //random Question
    let count = 0;

    function funcRandom() {
        return Math.floor(Math.random() * ezQ.length);
    }

    function displayQuestion() {
        //Fill in out Buttons
        count = funcRandom();
        disQ.innerText = ezQ[count].q;
        a1.innerText = ezQ[count].a1;
        a2.innerText = ezQ[count].a2;
        a3.innerText = ezQ[count].a3;
        a4.innerText = ezQ[count].a4;
    }
    a1.addEventListener('click', function () {
        checkAnswer(a1.innerText);
        displayQuestion();
    })
    a2.addEventListener('click', function () {
        checkAnswer(a2.innerText);
        displayQuestion();
    })
    a3.addEventListener('click', function () {
        checkAnswer(a3.innerText);
        displayQuestion();
    })
    a4.addEventListener('click', function () {
        checkAnswer(a4.innerText);
        displayQuestion();
    })
    function checkAnswer(string) {
        if (string === ezQ[count].c) {
            score.innerText++;
        }
    }
}


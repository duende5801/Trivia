//Grab inject elements
let inject = document.getElementById('inject');
let triviaEZ = [];
let triviaHD = [];
let triviaMD = [];
let difficulty = 0;
let totalQuestions = 20;

function loadJSON(url) {
    //load our JSON Data
    //XML HTTP-REQUEST

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            myFunction(myArr.questions);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {
        console.log(url);
        if (url === "../data/data.json") {
            for (let i = 0; i < arr.length; i++) {
                let nFO = {
                    "q": arr[i].q,
                    "a1": arr[i].a1,
                    "a2": arr[i].a2,
                    "a3": arr[i].a3,
                    "a4": arr[i].a4,
                    "c": arr[i].c
                }
                triviaEZ.push(nFO);
            };
        }
        else if (url === "../data/datamd.json") {
            for (let i = 0; i < arr.length; i++) {
                let nFO = {
                    "q": arr[i].q,
                    "a1": arr[i].a1,
                    "a2": arr[i].a2,
                    "a3": arr[i].a3,
                    "a4": arr[i].a4,
                    "c": arr[i].c
                }
                triviaMD.push(nFO);
                console.log(triviaEZ.q)
            };
        }
        else if (url === "../data/datahd.json") {
            for (let i = 0; i < arr.length; i++) {
                let nFO = {
                    "q": arr[i].q,
                    "a1": arr[i].a1,
                    "a2": arr[i].a2,
                    "a3": arr[i].a3,
                    "a4": arr[i].a4,
                    "c": arr[i].c
                }
                triviaHD.push(nFO);
                console.log(triviaEZ.q)
            };
        }
    };
}

loadJSON("../data/data.json");
loadJSON("../data/datamd.json");
loadJSON("../data/datahd.json");


function titleLoad(info) {
    inject.innerHTML = info;
    let g2Menu = document.getElementById('g2Menu');

    //Inject from TITLE screen to MENU screen
    g2Menu.addEventListener('click', function (e) {
        //call loadJSON to inject HTML
        loadHTML("../injections/menu_screen.html");
    });
}

window.onload = loadHTML("../injections/title_page.html");


function loadHTML(url) {
    //XML HTTP-REQUEST

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);
            console.log(myArr);
            if (url === "../injections/menu_screen.html") {
                menuScreenLoad(myArr);
            }
            else if (url === "../injections/game_screen.html") {
                if (difficulty === 1) {
                    gameScreenLoad(myArr, triviaEZ);
                } else if (difficulty === 2) {
                    gameScreenLoad(myArr, triviaMD);
                } else if (difficulty === 3) {
                    gameScreenLoad(myArr, triviaHD);
                }
            }
            else if (url === "../injections/options_screen.html") {
                optionsScreenLoad(myArr);
            }
            else if (url === "../injections/game_over_screen.html") {
                gameOverScreenLoad(myArr)
            }
            else if (url === "../injections/lose_game_over_screen.html") {
                gameLoseScreenLoad(myArr)
            }
            else if (url === "../injections/title_page.html") {
                titleLoad(myArr)
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
        loadHTML("../injections/game_screen.html");
        difficulty = 1;
    });
    playMedBtn.addEventListener('click', function (e) {
        loadHTML("../injections/game_screen.html");
        difficulty = 2;
    });
    playHrdBtn.addEventListener('click', function (e) {
        loadHTML("../injections/game_screen.html");
        difficulty = 3;
    });
    optionsScreen.addEventListener('click', function (e) {
        loadHTML("../injections/options_screen.html");

    });
}

function optionsScreenLoad(info) {
    //going to load the options screen html elements and click events
    inject.innerHTML = info;

    let music = document.getElementById('music');
    let back = document.getElementById('back');
    let audio = new Audio('../sound/song.mp3');
    let firstClicked = true;


    music.addEventListener('click', function () {

        if (firstClicked){
            audio.play();
            firstClicked=false;
        }
        else{
            audio.pause();
            audio.currentTime = 0;
            firstClicked = true;
        }
    });

    back.addEventListener('click', function (e) {
        loadHTML("../injections/menu_screen.html")
    })
}


function gameScreenLoad(info, arr) {
    inject.innerHTML = info;
    let count = 0;
    let cannonNum = 5;
    let dynomite = 5;
    let scoreCheck = 0;

    //add in elements and event listeners
    //Grab all the buttons
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let score = document.getElementById('score');
    let cannonballs = document.getElementById('cannonballs');
    let dynBtn = document.getElementsByClassName('dynBtn');
    let dyn1 = document.getElementById('dyn1');
    let dyn2 = document.getElementById('dyn2');
    let dyn3 = document.getElementById('dyn3');
    let dyn4 = document.getElementById('dyn4');
    let dyn5 = document.getElementById('dyn5');

    // Grab Class By Name
    // Returns an Array of HTML Elements
    let btns = document.getElementsByClassName('ansBtn');
    let q = document.getElementById('qL');
    let counter = document.getElementById('counter');


    setTimeout(displayQuestion, 500);
    let newTimer = setInterval(checkTime, 1000);

    let triviaQ = [];
    //create an array of random questions
    function funcRandom() {
        let qNum = 0;
        for (let i = 0; i < totalQuestions; i++) {
            //we are going to shuffle
            qNum = Math.floor(Math.random() * arr.length);
            //add from ezQ jsonarray to triviaQ
            triviaQ.push(arr[qNum]);
            //remove the item from ezQ
            arr.splice(qNum, 1);
        }

    }
    console.log(triviaQ);

    funcRandom();

    function displayQuestion() {
        //Fill in out Buttons
        a1.style.display = "block";
        a2.style.display = "block";
        a3.style.display = "block";
        a4.style.display = "block";
        q.innerText = triviaQ[count].q;
        a1.innerText = triviaQ[count].a1;
        a2.innerText = triviaQ[count].a2;
        a3.innerText = triviaQ[count].a3;
        a4.innerText = triviaQ[count].a4;
    }

    a1.addEventListener('click', function () {
        checkAnswer(a1.innerText);
        //checkGameOver();
    })
    a2.addEventListener('click', function () {
        checkAnswer(a2.innerText);
        //checkGameOver();

    })
    a3.addEventListener('click', function () {
        checkAnswer(a3.innerText);
        //checkGameOver();

    })
    a4.addEventListener('click', function () {
        checkAnswer(a4.innerText);
        //checkGameOver();

    })
    function checkAnswer(string) {
        if (string === triviaQ[count].c) {
            score.innerText++;
            scoreCheck++;
            triviaTimer = 20;
            count++;
        }
        else {
            triviaTimer = 20;
            count++;
        }
        setTimeout(() => {
            if (count > 19 && scoreCheck > 13) {
                clearInterval(newTimer);
                loadHTML("../injections/game_over_screen.html")
            }
            else if (count > 19 && scoreCheck <= 13) {
                clearInterval(newTimer);
                loadHTML("../injections/lose_game_over_screen.html")
            }
            else {
                displayQuestion();
            }
        }, 500);

    }

    // Run our Counter / Timer
    // Create our Max Time
    let triviaTimer = 20;
    //setInterval(checkTime, 1000);

    function checkTime() {
        if (triviaTimer !== 0) {
            counter.innerText = triviaTimer--;

        }
        else if (triviaTimer === 0) {
            checkAnswer();
            triviaTimer = 20;
        }
    }

    dyn1.addEventListener('click', function (e){
        if (a1.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
        }
        if (a2.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
        }
        if (a3.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
        }
        if (a4.innerText !== triviaQ[count].c) {
            a4.style.display = "none";
        }
        dyn1.className = "d-none";
        dyn2.className = "d-block";
    });
    dyn2.addEventListener('click', function (e){
        if (a1.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
        }
        if (a2.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
        }
        if (a3.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
        }
        if (a4.innerText !== triviaQ[count].c) {
            a4.style.display = "none";
        }
        dyn2.className = "d-none";
        dyn3.className = "d-block";
    });
    dyn3.addEventListener('click', function (e){
        if (a1.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
        }
        if (a2.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
        }
        if (a3.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
        }
        if (a4.innerText !== triviaQ[count].c) {
            a4.style.display = "none";
        }
        dyn3.className = "d-none";
        dyn4.className = "d-block";
    });
    dyn4.addEventListener('click', function (e){
        if (a1.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
        }
        if (a2.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
        }
        if (a3.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
        }
        if (a4.innerText !== triviaQ[count].c) {
            a4.style.display = "none";
        }
        dyn4.className = "d-none";
        dyn5.className = "d-block";
    });
    dyn5.addEventListener('click', function (e){
        if (a1.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
        }
        if (a2.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
        }
        if (a3.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
        }
        if (a4.innerText !== triviaQ[count].c) {
            a4.style.display = "none";
        }
        dyn5.className = "d-none";
    });
}

function gameOverScreenLoad(info) {
    inject.innerHTML = info;
    let toTitle = document.getElementById('toTitle');

    toTitle.addEventListener('click', function (e) {
        loadHTML("../injections/title_page.html");
    })
}
function gameLoseScreenLoad(info) {
    inject.innerHTML = info;
}


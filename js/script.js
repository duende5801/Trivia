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
                console.log(triviaMD.q)
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
                console.log(triviaHD.q)
            };
        }
    };
}

loadJSON("../data/data.json");
loadJSON("../data/datamd.json");
loadJSON("../data/datahd.json");
window.onload = loadHTML("../injections/title_page.html");


function titleLoad(info) {
    inject.innerHTML = info;
    let g2Menu = document.getElementById('g2Menu');

    //Inject from TITLE screen to MENU screen
    g2Menu.addEventListener('click', function (e) {
        //call loadHTML to inject HTML
        loadHTML("../injections/menu_screen.html");
    });
}



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

        if (firstClicked) {
            audio.play();
            firstClicked = false;
        }
        else {
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
    let scoreCheck = 0;
    let triviaQ = [];
    let triviaTimer = 20;
    let newTimer = setInterval(checkTime, 1000);

    //add in elements and event listeners
    //Grab all the buttons
    let q = document.getElementById('qL');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let score = document.getElementById('score');
    let dynBtn = document.getElementsByClassName('dynBtn');
    let dyn1 = document.getElementById('dyn1');
    let dyn2 = document.getElementById('dyn2');
    let dyn3 = document.getElementById('dyn3');
    let dyn4 = document.getElementById('dyn4');
    let dyn5 = document.getElementById('dyn5');
    let counter = document.getElementById('counter');

    // Grab Class By Name
    // Returns an Array of HTML Elements
    let ansBtn = document.getElementsByClassName('ansBtn');


    //gives the user a little time to react to right or wrong answer
    setTimeout(displayQuestion, 500);


    //create an array of random questions
    //Random array 'triviaQ' is a global variable up top
    function funcRandom() {
        let qNum = 0;
        for (let i = 0; i < totalQuestions; i++) {
            //we are going to shuffle
            //arr comes from the loadJson function
            qNum = Math.floor(Math.random() * arr.length);
            //add from ezQ jsonarray to triviaQ
            triviaQ.push(arr[qNum]);
            //remove the item from ezQ
            arr.splice(qNum, 1);
        }
        console.log(triviaQ);
    }

    funcRandom();


    //This is the function that displays all questions and answers located in json files
    //look at above fuction to see where array came from
    function displayQuestion() {
        //Fill in out Buttons
        a1.style.display = "block";
        a2.style.display = "block";
        a3.style.display = "block";
        a4.style.display = "block";
        a1.className = "btn btn-primary btn-lg btn-block";
        a2.className = "btn btn-primary btn-lg btn-block";
        a3.className = "btn btn-primary btn-lg btn-block";
        a4.className = "btn btn-primary btn-lg btn-block";
        q.innerText = triviaQ[count].q;
        a1.innerText = triviaQ[count].a1;
        a2.innerText = triviaQ[count].a2;
        a3.innerText = triviaQ[count].a3;
        a4.innerText = triviaQ[count].a4;
    }

    a1.addEventListener('click', function () {
        checkAnswer(a1.innerText);
        //this changes the color of the buttons weather it is right or wrong
        //would like to use this feature in the checkAnswer function since it is a repetitive function
        //btn-success is bootstrap and makes the btn=green btn-danger makes the btn=red
        if(a1.innerText === triviaQ[count].c){
            a1.className = "btn btn-success btn-lg btn-block";
        }
        else{
            a1.className = "btn btn-danger btn-lg btn-block";
        }
    });
    a2.addEventListener('click', function () {
        checkAnswer(a2.innerText);
        if(a2.innerText === triviaQ[count].c){
            a2.className = "btn btn-success btn-lg btn-block";
        }
        else{
            a2.className = "btn btn-danger btn-lg btn-block";
        }
    });
    a3.addEventListener('click', function () {
        checkAnswer(a3.innerText);
        if(a3.innerText === triviaQ[count].c){
            a3.className = "btn btn-success btn-lg btn-block";
        }
        else{
            a3.className = "btn btn-danger btn-lg btn-block";
        }

    });
    a4.addEventListener('click', function () {
        checkAnswer(a4.innerText);
        if(a4.innerText === triviaQ[count].c){
            a4.className = "btn btn-success btn-lg btn-block";
        }
        else{
            a4.className = "btn btn-danger btn-lg btn-block";
        }
    });


    //checkAnswer is the function cycles through the array
    // as well as checks for the end of the game and keep score
    //these are the actions need to happen after a user click
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


        //this is the function that checks if the game is over or still going
        //the function also injects a new page after the game is over
        setTimeout(() => {
            if (count > 19 && scoreCheck > 13) {
                //going to a new screen and need timer to stop
                //clearInterval to stop timer
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
            //arrow function, anonymous function allowing me to delay the action going on by .5 secs
        }, 500);

    }


    // Run our Counter / Timer 

    // Create our Max Time
    // Max Time global variable up top
    function checkTime() {
        if (triviaTimer !== 0) {
            counter.innerText = triviaTimer--;

        }
        //run checkAnswer to cycle through question array
        else if (triviaTimer === 0) {
            checkAnswer();
            triviaTimer = 20;
        }
    }


    //add listener to all 5 dynomite
    //this is the extra feature that gets rid of all wrong answers for a question.

    //adding a function for the repetitve portion of the listeners
    function extraFeature() {
        if (a1.innerText !== triviaQ[count].c && a2.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
            a2.style.display = "none";
        }
        else if (a1.innerText !== triviaQ[count].c && a3.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
            a3.style.display = "none";
        }
        else if (a1.innerText !== triviaQ[count].c && a4.innerText !== triviaQ[count].c) {
            a1.style.display = "none";
            a4.style.display = "none";
        }
        else if (a2.innerText !== triviaQ[count].c && a3.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
            a3.style.display = "none";
        }
        else if (a2.innerText !== triviaQ[count].c && a4.innerText !== triviaQ[count].c) {
            a2.style.display = "none";
            a4.style.display = "none";
        }
        else if (a3.innerText !== triviaQ[count].c && a4.innerText !== triviaQ[count].c) {
            a3.style.display = "none";
            a4.style.display = "none";
        }
    }

    dyn1.addEventListener('click', function (e) {
        extraFeature();
        dyn1.className = "d-none";
        dyn2.className = "d-block";
    });
    dyn2.addEventListener('click', function (e) {
        extraFeature();
        dyn2.className = "d-none";
        dyn3.className = "d-block";
    });
    dyn3.addEventListener('click', function (e) {
        extraFeature();
        dyn3.className = "d-none";
        dyn4.className = "d-block";
    });
    dyn4.addEventListener('click', function (e) {
        extraFeature();
        dyn4.className = "d-none";
        dyn5.className = "d-block";
    });
    dyn5.addEventListener('click', function (e) {
        extraFeature();
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


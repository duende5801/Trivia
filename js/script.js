function loadJSON(url) {
    //load our JSON Data
    //XML HTTP-REQUEST

    let xmlhttp = new XMLHttpRequest();
    // let url = "../data/data.json";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            loadEZQ(myArr);
        }
    };
    //Opening the connection
    xmlhttp.open("GET", url, true);
    //Sending the request
    xmlhttp.send();

}

//Play easy mode
//grab easy mode json data
let playEZBtn = document.getElementById('playEZ');
playEZBtn.addEventListener('click', function(e){
    loadJSON("../data/data.json");
    //loadJSON("../data/datahd.json");
});

//Grab all the buttons
let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let a3 = document.getElementById('a3');
let a4 = document.getElementById('a4');
let score = document.getElementById('score');
// Grab Class By Name
// Returns an Array of HTML Elements
let btns = document.getElementsByClassName('ansBtn');
let disQ = document.getElementById('qL');
let counter = document.getElementById('counter');
//random Question
let count=0;

function funcRandom(){
    return Math.floor(Math.random()*ezQ.length);
}

let ezQ = [];
//Function is called inside HTTP Request
function loadEZQ(info) {
    //Setup our Objects for the game
    //Moving over to questions to stop typing in info
    ezQ = info.ezQ;
    displayQuestion();
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

a1.addEventListener('click', function(){
    checkAnswer(a1.innerText);
    displayQuestion();
})
a2.addEventListener('click', function(){
    checkAnswer(a2.innerText);
    displayQuestion();
})
a3.addEventListener('click', function(){
    checkAnswer(a3.innerText);
    displayQuestion();
})
a4.addEventListener('click', function(){
    checkAnswer(a4.innerText);
    displayQuestion();
})

function checkAnswer(string){
    if (string === ezQ[count].c){
        score.innerText ++;
    }
}
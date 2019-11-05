function loadJSON() {
    //load our JSON Data
    //XML HTTP-REQUEST

    let xmlhttp = new XMLHttpRequest();
    let url = "../data/data.json";

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
    loadJSON();

});

//Grab all the buttons
let a1 = document.getElementById('a1');
let a2 = document.getElementById('a2');
let a3 = document.getElementById('a3');
let a4 = document.getElementById('a4');
// Grab Class By Name
// Returns an Array of HTML Elements
let btns = document.getElementsByClassName('ansBtn');
let disQ = document.getElementById('qL');
let counter = document.getElementById('counter');


let ezQ = [];
//Function is called inside HTTP Request
function loadEZQ(info) {
    //Setup our Objects for the game
    //Moving over to questions to stop typing in info
    ezQ = info.ezQ;
    console.log(ezQ);
    displayQuestion();
}

function displayQuestion() {
    //Fill in out Buttons
    disQ.innerText = ezQ[0].q;
    a1.innerText = ezQ[0].a1;
    a2.innerText = ezQ[0].a2;
    a3.innerText = ezQ[0].a3;
    a4.innerText = ezQ[0].a4;

}

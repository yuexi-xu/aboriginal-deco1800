$(document).ready(function() {
    var name = localStorage.getItem('username');
    var score = localStorage.getItem('currentScore');
    console.log(score);
    document.getElementById("title").innerHTML = name + ', your final score is:'; 
    document.getElementById('score_h3').innerText = score;
});

function goBack(){
    localStorage.clear();
    window.location.href='index.html';
}
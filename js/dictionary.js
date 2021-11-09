let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

scanner.addListener('scan', function (content) {
    console.log(content);
    createElement(content);
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

function closeForm(){
    document.getElementById('congrat_form').style.display = "none";
}

var order = 0;
function createElement(content){
    localStorage.setItem(order, content);
    order++;

    let ul = document.getElementById("words_list");
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    var words_array = content.split('-');
    h3.appendChild(document.createTextNode(words_array[0]));
    p.appendChild(document.createTextNode(words_array[1]));

    h3.className = 'english';
    p.className = 'aboriginal';

    li.appendChild(h3);
    li.appendChild(p);
    ul.appendChild(li);

    document.getElementById('title').innerHTML = 'Gotcha!';
    document.getElementById("congratTxt").innerHTML = "Congratulations! You just captured a new word!";
    document.getElementById('congrat_form').style.display = "block";
}

let count = 1;
function controlcam(){
    if(count == 1| count%2 != 0){
        scanner.stop();
        count++;
        console.log(count);
    } else {
        count++;
        console.log(count);
        Instascan.Camera.getCameras().then(function (cameras) {
            scanner.start(cameras[0]);
    })
    }
}

function nextbtn() {
    var listElement = document.getElementById("words_list").getElementsByTagName("li");
    var ElementNo = listElement.length;
    
    if (ElementNo == 1 ){
        document.getElementById('title').innerHTML = 'Not so fast!';
        document.getElementById("congratTxt").innerHTML = "Well, you need to capture some words first!";
        document.getElementById('congrat_form').style.display = "block";
    } else{
        window.location.href='guessword.html'
    }
}

function clearbtn() {
    console.log("cleared");
    localStorage.clear();
}
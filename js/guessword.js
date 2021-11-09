var score = 100;
var totalAns = 0;
var answered = false;
var hamControl = 1;

function randomize(wordsPairs) {
	var keys = Object.keys(wordsPairs)
	var random_key = keys[ keys.length * Math.random() << 0]
	var random_abo_pronun = wordsPairs[random_key];
	
	const random_pair = [random_key, random_abo_pronun];

	var distrac1_key = keys[ keys.length * Math.random() << 0];
	var distrac2_key = keys[ keys.length * Math.random() << 0];

	while (distrac1_key == random_key){
		distrac1_key = keys[ keys.length * Math.random() << 0]; 
	}

	while (distrac2_key == random_key || distrac2_key == distrac1_key){
		distrac2_key = keys[ keys.length * Math.random() << 0];
	}	

	const options = [random_pair, distrac1_key, distrac2_key]
	console.log(options);
	return options;
};

function iterateRecords(results) {
	var wordsPairs = {};

	$.each(results.result.records, function(recordID, recordValue) {
		var englishWord = recordValue["English"];
		var aboword_pronun = [recordValue["Barunggam"], recordValue["Pronunciation"]];
		
		wordsPairs[englishWord] = aboword_pronun;
	});

	return wordsPairs;
}

function appendWord(loaded_pairs) {
	options = randomize(loaded_pairs);

	document.getElementById("english").innerHTML = options[0][0];
	document.getElementById("abo").textContent = options[0][1][0];
	document.getElementById("pronun").textContent = options[0][1][1];
	console.log(options[0][1][1]);


	var randomAnswer = [options[0][0], options[1], options[2]];
	var ran1 = randomAnswer[Math.floor(Math.random() * randomAnswer.length)];
	var ran2 = randomAnswer[Math.floor(Math.random() * randomAnswer.length)];
	var ran3 = randomAnswer[Math.floor(Math.random() * randomAnswer.length)];
	while (ran2 == ran1){
		ran2 = randomAnswer[Math.floor(Math.random() * randomAnswer.length)];
	}
	while (ran3 == ran1 || ran3 == ran2){
		ran3 = randomAnswer[Math.floor(Math.random() * randomAnswer.length)];
	}

	document.getElementById("btn1").innerHTML = ran1;
	document.getElementById("btn2").innerHTML = ran2;
	document.getElementById("btn3").innerHTML = ran3;
}

function loadDataset(rsc_id){
	var data = {
		resource_id: rsc_id,
		limit: 50,
	}

	$.ajax({
		url: "https://data.qld.gov.au/api/3/action/datastore_search",
		data: data,
		dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
		cache: true,
		success: function(results) {
			loaded_pairs = iterateRecords(results); 
			appendWord(loaded_pairs);
		}
	});
}

$(document).ready(function() {
	words = {};

	// Barungam dataset
	loadDataset("e877c83a-be8a-4475-a496-7e808fa07935");

	document.getElementById('score').innerHTML = 'Score: ' + score;
});

for (var i = 0; i < localStorage.length; i++){
    var pair = localStorage.getItem(i);

    let ul = document.getElementById("words_list");
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    var words_array = pair.split('-');
    h3.appendChild(document.createTextNode(words_array[0]));
    p.appendChild(document.createTextNode(words_array[1]));

    h3.className = 'english';
    p.className = 'aboriginal';

    li.appendChild(h3);
    li.appendChild(p);
    ul.appendChild(li);
}

function openHamburger(x) {
    if (hamControl % 2 != 0) {
        document.getElementById("hamburger_ul").style.width = "250px";
		hamControl++;
		console.log(hamControl);
    } else if(hamControl % 2 == 0) {
        document.getElementById("hamburger_ul").style.width = "0";
		hamControl++;
		console.log(hamControl);
    }
    x.classList.toggle("change");
    
}

function verify(id) {
    var txt = document.getElementById(id).innerHTML;
    var correct_ans = document.getElementById("english").innerHTML;

    if (txt == correct_ans){
		document.getElementById("correct_pop_up").style.display = "block";
		answered = true;
    } else {
		document.getElementById("wrong_pop_up").style.display = "block";
		if (answered == false){
			score = score - 10;
			document.getElementById('score').innerHTML = 'Score: ' + score;
		}
		answered = true;
	}
	if (totalAns == 5){
		document.getElementById("next_btn").innerHTML = "Next Game";
	}
}

function closeForm(id){
    if (id == "btn_in_correct"){
        document.getElementById("correct_pop_up").style.display = "none";
    } else if (id == "btn_in_wrong") {
        document.getElementById("wrong_pop_up").style.display = "none";
    } else if (id == "cbtn") {
		document.getElementById("common_pop_up").style.display = "none";
	}
}

function nextbtn(){
	if (totalAns == 5){
		document.getElementById("common_pop_up").style.display = "block";
		document.getElementById("ctitle").innerHTML = "Your current score is:";
		document.getElementById("ccontent").innerHTML = score;
		document.getElementById("cbtn").innerHTML = "Next Game";
		document.getElementById("cbtn").onclick = function(){
			console.log(score);
			localStorage.setItem('currentScore', score);
			window.location = ('puzzle.html');
		}
	} else{
		if (answered==false){
			document.getElementById("common_pop_up").style.display = "block";
			document.getElementById("ctitle").innerHTML = "Not so fast!";
			document.getElementById("ccontent").innerHTML = "Seems like you haven't answered the question";
			document.getElementById("cbtn").innerHTML = "Close";
			document.getElementById("cbtn").onclick = function(){
				document.getElementById("common_pop_up").style.display = "none";
			}
		} else{
			appendWord(loaded_pairs);
			console.log(score);
			console.log(totalAns);
			answered = false;
			totalAns++;
			document.getElementById("correct_pop_up").style.display = "none";
		}
	}
}
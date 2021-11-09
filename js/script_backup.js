function randomize(wordsPairs) {
	var keys = Object.keys(wordsPairs)
	var key = keys[ keys.length * Math.random() << 0]
	var random_abo_pronun = wordsPairs[key];
	const random_pair = [key, random_abo_pronun];

	var distrac1_key = keys[ keys.length * Math.random() << 0];
	var distrac2_key = keys[ keys.length * Math.random() << 0];

	while (distrac1_key == key){
		distrac1_key = keys[ keys.length * Math.random() << 0]; 
	}

	while (distrac2_key == key || distrac2_key == distrac1_key){
		distrac2_key = keys[ keys.length * Math.random() << 0];
	}	

	const options = [random_pair, distrac1_key, distrac2_key]
	// console.log(options);
	return options;
};

function iterateRecords(results) {

	// console.log(results);

	var wordsPairs = {};

	$.each(results.result.records, function(recordID, recordValue) {

		var englishWord = recordValue["English"];
		var aboword_pronun = [recordValue["Barunggam"], recordValue["Pronunciation"]];
		
		wordsPairs[englishWord] = aboword_pronun;
		
		// for (var key in wordsPairs) {
		// 	if (wordsPairs.hasOwnProperty(key)) {
		// 		console.log(key + " -> " + wordsPairs[key]);
		// 	}
		// }
		
		// document.getElementById("english").textContent = englishWord;
	});
	return wordsPairs;
}

function appendWord(loaded_pairs) {
	options = randomize(loaded_pairs);

	document.getElementById("english").innerHTML = options[0][0];
	document.getElementById("abo").textContent = options[0][1][0];
	document.getElementById("pronun").textContent = options[0][1][1];

	document.getElementById("btn1").innerHTML = options[0][0];
	document.getElementById("btn2").innerHTML = options[1];
	document.getElementById("btn3").innerHTML = options[2];
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

	loadDataset("e877c83a-be8a-4475-a496-7e808fa07935");

	// var data = {
	// 	resource_id: "e877c83a-be8a-4475-a496-7e808fa07935",
	// 	limit: 50,
	// }

	// $.ajax({
	// 	url: "https://data.qld.gov.au/api/3/action/datastore_search",
	// 	data: data,
	// 	dataType: "jsonp", // We use "jsonp" to ensure AJAX works correctly locally (otherwise it'll be blocked due to cross-site scripting).
	// 	cache: true,
	// 	success: function(results) {
	// 		loaded_pairs = iterateRecords(results);
	// 		appendWord(loaded_pairs);
	// 	}
	// });

});
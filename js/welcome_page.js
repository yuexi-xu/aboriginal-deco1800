$("img").click(function() {
	document.getElementById('welcome_message').style.display = 'flex';
	document.getElementById('main').style.display = 'none';
})

function amReady(){
	var input = document.getElementById('username').value;
	
	if (input==''){
		alert('You need to enter your name');
	}else{
		localStorage.setItem('username', input);
		window.location.href='dictionary.html';
	}
}

function saveName(txt){
	if(event.key === 'Enter'){
		if(txt.value == ''){
			alert('You need to enter your name');
		}else {
			amReady();
		}
	}
}
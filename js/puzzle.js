var time=0;

var pause=true;

var set_timer;

var d=new Array(10);

var d_direct=new Array(
        [0],
        [2,4],
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
    );

var d_posXY=new Array(
        [0],
        [0,0],
        [150,0],
        [300,0],
        [0,150],
        [150,150],
        [300,150],
        [0,300],
        [150,300],
        [300,300]
    );

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;

var totalPuzzles = 0;
var animals = [['eagle', 'Juwehrr'], ['emu','Nguyi'], ['kangaroo','Barrar'], ['koala','Dumbirrbi']];
var newScore = localStorage.getItem('currentScore');

function skip() {
    // console.log(animals);
    if (totalPuzzles<2){
        newScore = newScore - 20;
        var nextAnimal = animals[Math.floor(Math.random()*animals.length)];
        // console.log(nextAnimal);
        animals.splice(animals.indexOf(nextAnimal[0]),1);  
        changeTo(nextAnimal);
        reset();
        totalPuzzles++;
        console.log(totalPuzzles);
    } else{
        document.getElementById('final_pop_up').style.display = 'block';
        document.getElementById('fcontent').innerHTML = "You've finished all the puzzles in " + time + " seconds"; 
    }
    
}

function changeTo(nextAnimal) {
    var i;
    document.getElementById('animal_name').innerHTML = nextAnimal[1];
    for (i=1; i<9; i++) {
        document.getElementById('d'+i).style.backgroundImage = "url(images/"+nextAnimal[0]+"/image_part_00"+i+".jpg)";
    }
}

function toFinal() {
    localStorage.setItem('currentScore', newScore);
    window.location=('final.html')
}

function move(id){
    
    var i=1;
    for(i=1; i<10; ++i){
        if( d[i] == id )
            break;
    }
    
    var target_d=0;
    
    target_d=whereCanTo(i);
    
    if( target_d != 0){
        d[i]=0;
        
        d[target_d]=id;
        
        document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
        
    }
    
    var finish_flag=true;
    
    for(var k=1; k<9; ++k){
        if( d[k] != k){
            finish_flag=false;
            break;
        }
    }
    
    if(finish_flag==true){
        if(!pause)
            start();
        alert("Congratulations!");
        skip();
        newScore = newScore + 20;
    }
    
}

function whereCanTo(cur_div){

    var j=0;
    var move_flag=false;
    for(j=0; j<d_direct[cur_div].length; ++j){
        
        if( d[ d_direct[cur_div][j] ] == 0 ){
            move_flag=true;
            break;
        }
        
    }
    if(move_flag == true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }
    
}


function timer(){
    time+=1;
    var min=parseInt(time/60);
    var sec=time%60;
    document.getElementById("timer").innerHTML=min+"m"+sec+"s";
}


function start(){
    if(pause){
        document.getElementById("start").innerHTML="PAUSE";
        pause=false;
        set_timer=setInterval(timer,1000);
        
    }else{
        document.getElementById("start").innerHTML="PAUSE";
        pause=true;
        clearInterval(set_timer);
    }
}


function reset(){
    random_d();
    if(pause)
        start();
}


function random_d(){
    for(var i=9; i>1; --i){
        var to=parseInt(Math.random()*(i-1)+1);
        if(d[i]!=0){
            document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
            document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
        }
        
        if(d[to]!=0){
            document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
            document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";
        }
        
        var tem=d[to];
        d[to]=d[i];
        d[i]=tem;
        
    }
}


window.onload=function(){
    reset();
}

var image = document.getElementsByTagName("img");

var box = document.getElementsByClassName("box");

image.draggable = true;

var source = "";

var nowImage;

var nowImageBox;

var thenImage;

for(let i=0;i<image.length;i++){

    source = "picture"+i+".jpg";

    image[i].setAttribute("src",source);

    image[i].onmousedown = function(){

        nowImage = this;

        nowImageBox = this.parentNode;

    }

    box[i].ondragover = function(event){

        event.preventDefault(); 

    }

    box[i].ondrop = function(event){

        thenImage = box[i].childNodes[0];

        box[i].appendChild(nowImage);

    nowImageBox.appendChild(thenImage);

    }

}
var hamControl = 1;
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
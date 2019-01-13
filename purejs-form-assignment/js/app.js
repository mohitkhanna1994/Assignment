var questions;
window.onload = onRender;
function onRender(){
document.getElementById("success").style.display = "none";
var xhr = new XMLHttpRequest();
//Loading all the questions
xhr.open('GET', 'http://127.0.0.1:8000/questions');
xhr.onload = function() {
    if (xhr.status === 200) {
		questions = JSON.parse(xhr.responseText);
    }
    else {
		console.log('Request failed.  Returned status of ' + xhr.status);
    }
	//Iterarting through all the questions
	for(var key=0;key<questions.length;key++) {
	if(questions[key].mandatory){		
		if(questions[key].has_options){
			if(questions[key].type == 'radio'){
				var temp = key;
				//loading the options
				xhr.open('GET', 'http://127.0.0.1:8000/options?question='+(temp+1)+'');
				xhr.onload = function() {
				if(xhr.status===200){				
					document.getElementById('queue').innerHTML += "<p>"+questions[temp].title+"</p>";					
					var options = JSON.parse(xhr.responseText);
						//Iterarting the options
						 for( var i=0;i<options.length;i++){					 
							document.getElementById('queue').innerHTML += "<input type="+questions[temp].type+" name='option' value="+options[i].value+" required>"+options[i].label+"</input><br />"; 					
						}	 				
					}
				}
				xhr.send();				
			}
			if(questions[key].type == 'checkbox'){
				var temp1 = key;
				var xhr1 = new XMLHttpRequest();
				//loading the options
				xhr1.open('GET', 'http://127.0.0.1:8000/options?question='+(temp1+1)+'');
				xhr1.onload = function() {
					if(xhr1.status===200){				
					document.getElementById('queue').innerHTML += "<p>"+questions[temp1].title+"</p>";					
					var options1 = JSON.parse(xhr1.responseText);
						//Iterarting the options
						for( var i=0;i<options1.length;i++){					
							document.getElementById('queue').innerHTML += "<input type="+questions[temp1].type+" name='option'  value="+options1[i].value+" >"+options1[i].label+"</input><br />";					
						}
					}				
				}
				xhr1.send();
			}		
		}else{
			if(questions[key].type == 'rating'){			
				document.getElementById('queue').innerHTML += "<p>"+questions[key].title+"</p>";
				document.getElementById('queue').innerHTML += "<input type='range' min='0' max='10' step='1' value='0' onchange='showrating(this.value);' required></input><span id='rating'>0</span>";			
			}else 
				if(questions[key].type == 'number'){			
				document.getElementById('queue').innerHTML += "<p>"+questions[key].title+"</p>";
				document.getElementById('queue').innerHTML += "<input pattern='.{10}' title='length has to be 10' required></input>";
			}
			else{				
				document.getElementById('queue').innerHTML += "<p>"+questions[key].title+"</p>";
				document.getElementById('queue').innerHTML += "<input type="+questions[key].type+" required></input>";
			}
		}		
	}
	else{		
		document.getElementById('queue').innerHTML += "<p>"+questions[key].title+"</p>";
		document.getElementById('queue').innerHTML += "<textarea rows='5' cols='50'></textarea><br>";
	}
  }	
};
xhr.send();  
}

//Funtion to display the given rating
function showrating(val) {
  document.getElementById('rating').innerText=val; 
}

function enter(event){
	document.getElementById("myform").style.display = "none";
	document.getElementById("success").style.display = "block";	
}
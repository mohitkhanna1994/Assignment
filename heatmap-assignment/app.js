 window.onload = loadDoc;
 function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    
    console.log(data);
    var locations = data.length/7;
    var locA = data.slice(0,7);
    var locB = data.slice(7,14);
    var locC = data.slice(14,21);
    console.log(locA)
    console.log(locB)
    console.log(locC)
    var table = document.getElementById("mytable");
    for(var i=0;i<7;i++){
      var row = table.insertRow(i+1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      // cell1.style.background = (10,10,locA[i].value);
      // cell1.innerHTML = locA[i].value;
      //cell1.style.color = "rgb(100,100,100)";
      cell1.style.background = colorText(locA[i].value);
      cell2.style.background = colorText(locB[i].value);
      cell3.style.background = colorText(locC[i].value);
      cell4.innerHTML = (i+1);
      // cell2.innerHTML = locB[i].value;
      // cell3.innerHTML = locC[i].value;
    }
    }
  };
  xhttp.open("GET", "panel.json", true);
  xhttp.send();
}

function colorText(x){
  if(x==1){
    return "yellow"
  }else if(x ==2){
    return "red";
  }else if(x==3){
    return "grey";
  }else if(x==4){
    return "blue";
  }else if(x==5){
    return "green";
  }else if(x==6){
    return "lightblue";
  }else if(x==7){
    return "cyan";
  }else if(x==8){
    return "lightgrey";
  }else if(x==9){
    return "green";
  }else if(x==10){
    return "brown";
  }
}
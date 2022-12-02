const firebaseConfig = {
  apiKey: "AIzaSyB1eOxXlPpUht1GB_dkZFjwyK8CHrXxO98",
  authDomain: "esp32-af5ad.firebaseapp.com",
  databaseURL: "https://esp32-af5ad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-af5ad",
  storageBucket: "esp32-af5ad.appspot.com",
  messagingSenderId: "1082673292807",
  appId: "1:1082673292807:web:11f7d5b7438a109659aca2"
};
  
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
 
  // Living room
  var btnon1 = document.getElementById("btn1");
  var btnoff1 = document.getElementById("btn2");
  var btnon2 = document.getElementById("btn3");
  var btnoff2 = document.getElementById("btn4");
  var btnon3 = document.getElementById("btn5");
  var btnoff3 = document.getElementById("btn6");
  
  btnon1.onclick = function(){
    document.getElementById("led").src = "./img/light_bulb.png"
    database.ref("/iotlab/livingroom").update({
      "Led" : 1
    });
  }
  
  btnoff1.onclick = function(){
    document.getElementById("led").src = "./img/light_bulb_off.png"
    database.ref("/iotlab/livingroom").update({ 
      "Led" : 0
    });
  }
  
  btnon2.onclick = function(){
    document.getElementById("fan").src = "./img/fan_on.jpg"
    database.ref("/iotlab/livingroom").update({
      "Fan" : 1
    });
  }
  
  btnoff2.onclick = function(){
    document.getElementById("fan").src = "./img/fan_off.jpg"
    database.ref("/iotlab/livingroom").update({ 
      "Fan" : 0
    });
  }
  
  
  btnon3.onclick = function(){
    document.getElementById("window").src = "./img/window_open.jpg"
    database.ref("/iotlab/livingroom").update({
    "Window" : 1
    });
  }
  
  btnoff3.onclick = function(){
    document.getElementById("window").src = "./img/window_close.jpg"
    database.ref("/iotlab/livingroom").update({ 
    "Window" : 0
    });
  }
  
  database.ref("/iotlab/livingroom/Temperature").on("value", function(snapshot) {
    if(snapshot.exists()){
      var temp = snapshot.val();
      document.getElementById("nhietdo").innerHTML = temp;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/livingroom/Humidity").on("value", function(snapshot) {
    if(snapshot.exists()){
      var humi = snapshot.val();
      document.getElementById("doam").innerHTML = humi;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/livingroom/Rain").on("value", function(snapshot) {
    if(snapshot.exists()){
      var temp = snapshot.val();
      document.getElementById("luongmua").innerHTML = temp;
    }
    else
      console.log("No data available!")
  });
   
  // Bed Room
  var btnon4 = document.getElementById("btn7");
  var btnoff4 = document.getElementById("btn8");
  var btnon5 = document.getElementById("btn9");
  var btnoff5 = document.getElementById("btn10");
  var btnon6 = document.getElementById("btn11");
  var btnoff6 = document.getElementById("btn12");
  
  btnon4.onclick = function(){
    document.getElementById("led1").src = "./img/light_bulb.png"
    database.ref("/iotlab/bedroom").update({
      "Led" : 1
    });
  }
  
  btnoff4.onclick = function(){
    document.getElementById("led1").src = "./img/light_bulb_off.png"
    database.ref("/iotlab/bedroom").update({ 
    "Led" : 0
    });
  }
  
  btnon5.onclick = function(){
    document.getElementById("airc").src = "./img/airc_on.png"
    database.ref("/iotlab/bedroom").update({
      "Airconditioner" : 1
    });
  }
  
  btnoff5.onclick = function(){
    document.getElementById("airc").src = "./img/airc_off.png"
    database.ref("/iotlab/bedroom").update({ 
    "Airconditioner" : 0
    });
  }
  
  btnon6.onclick = function(){
    document.getElementById("speaker").src = "./img/speaker_on.jpg"
    database.ref("/iotlab/bedroom").update({
      "Speaker" : 1
    });
  }
  
  btnoff6.onclick = function(){
    document.getElementById("speaker").src = "./img/speaker_off.jpg"
    database.ref("/iotlab/bedroom").update({ 
      "Speaker" : 0
    });
  }
  
  database.ref("/iotlab/bedroom/Temperature").on("value", function(snapshot) {
    if(snapshot.exists()){
      var temp = snapshot.val();
      document.getElementById("nhietdo1").innerHTML = temp;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/bedroom/Humidity").on("value", function(snapshot) {
    if(snapshot.exists()){
      var humi = snapshot.val();
      document.getElementById("doam1").innerHTML = humi;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/bedroom/Gas").on("value", function(snapshot) {
    if(snapshot.exists()){
      var gas = snapshot.val();
      document.getElementById("khiga").innerHTML = gas;
    }
    else
      console.log("No data available!")
  });
  
  // Garden
  var btnon7 = document.getElementById("btn13");
  var btnoff7 = document.getElementById("btn14");
  var btnon8 = document.getElementById("btn15");
  var btnoff8 = document.getElementById("btn16");
  var btnon9 = document.getElementById("btn17");
  var btnoff9 = document.getElementById("btn18");
  
  btnon7.onclick = function(){
    document.getElementById("led2").src = "./img/light_bulb.png"
    database.ref("/iotlab/garden").update({
      "Led2" : 1
    });
  }
  
  btnoff7.onclick = function(){
    document.getElementById("led2").src = "./img/light_bulb_off.png"
    database.ref("/iotlab/garden").update({ 
      "Led2" : 0
    });
  }
  
  btnon8.onclick = function(){
    document.getElementById("phone").src = "./img/phone_on.jpg"
      database.ref("/iotlab/garden").update({
        "Phone" : 1
      });
    }
    
  btnoff8.onclick = function(){
    document.getElementById("phone").src = "./img/phone_off.jpg"
    database.ref("/iotlab/garden").update({ 
      "Phone" : 0
    });
    }
    
  btnon9.onclick = function(){
    document.getElementById("water").src = "./img/wateringplant_on.jpg"
    database.ref("/iotlab/garden").update({
      "Watering" : 1
    });
    }
    
  btnoff9.onclick = function(){
    document.getElementById("water").src = "./img/wateringplant.png"
    database.ref("/iotlab/garden").update({ 
      "Watering" : 0
    });
  }

  database.ref("/iotlab/garden/Temperature").on("value", function(snapshot) {
    if(snapshot.exists()){
      var temp = snapshot.val();
      document.getElementById("nhietdo2").innerHTML = temp;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/garden/Humidity").on("value", function(snapshot) {
    if(snapshot.exists()){
      var humi = snapshot.val();
      document.getElementById("doam2").innerHTML = humi;
    }
    else
      console.log("No data available!")
  });
  
  database.ref("/iotlab/garden/Rain").on("value", function(snapshot) {
    if(snapshot.exists()){
      var rain = snapshot.val();
      document.getElementById("luongmua2").innerHTML = rain;
    }
    else
      console.log("No data available!")
  });

  function openPage(pageName,element,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    let ele = document.getElementById(pageName);
    ele.style.display = "block";
    ele.style.backgroundRepeat= 'no-repeat';
    ele.style.backgroundSize= '100% 100%';
    switch(ele.id){
      case 'Livingroom':
        //document.body.style.setProperty('background-color', 'lightblue');
        ele.style.backgroundImage = 'url("./img/liv.jpg")';
        break;
      case 'Bedroom':
        //document.body.style.setProperty('background-color', 'purple');
        ele.style.backgroundImage = 'url("./img/bed.jpg")';
        break;
      case 'Garden':
        //document.body.style.setProperty('background-color', 'blue');
        ele.style.backgroundImage = 'url("./img/gar.jpg")';
        break;
    }
    element.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  
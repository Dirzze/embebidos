//https://www.eclipse.org/paho/clients/js/

function Historial_1() {
  
  console.log("Pedir Registro1");

  message = new Paho.MQTT.Message("REGISTRO1");
      message.destinationName = "dirzze.morocho@unach.edu.ec/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
  
}

function Historial_2(){

  console.log("Pedir Registro2");

  message = new Paho.MQTT.Message("REGISTRO2");
      message.destinationName = "dirzze.morocho@unach.edu.ec/t1";
      client.send(message);
  //document.getElementById("sensor").innerHTML="led off";
  
}

function Mostrar_1() {

  var Sensor1=document.getElementById("sensor1");//Muestra el primer valor en la etiqueta
  var HiddenSensor1=Sensor1.getAttribute("hidden");

  if(HiddenSensor1){
    Sensor1.removeAttribute("hidden");//Muestra
  }else{
    Sensor1.setAttribute("hidden", "hidden");//Oculta
  }

}

function Mostrar_2() {

  var Sensor1=document.getElementById("sensor2");//Muestra el primer valor en la etiqueta
  var HiddenSensor1=Sensor1.getAttribute("hidden");

  if(HiddenSensor1){
    Sensor1.removeAttribute("hidden");//Muestra
  }else{
    Sensor1.setAttribute("hidden", "hidden");//Oculta
  }

}



// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "dirzze.morocho@unach.edu.ec",
    password: "dirzze1221",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("dirzze.morocho@unach.edu.ec/t2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "dirzze.morocho@unach.edu.ec/t1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
        console.log("onMessageArrived:"+message.payloadString);
    
    var Mensaje=message.payloadString;//Se guarda el mensaje en una variable
    var Registro=Mensaje.split('_')

    if (Registro[0]==("R1")){//Cuando se conecta por primera vez a la tarjeta
      document.getElementById("Historial1").innerHTML=Registro[1];//Muestra un mensaje de recibido en la web
    }
    if (Registro[0]==("R2")){//Cuando se conecta por primera vez a la tarjeta
      document.getElementById("Historial2").innerHTML=Registro[1];//Muestra un mensaje de recibido en la web
    }

    var Sensores=Mensaje.split(':');//Divide el formato en que llegan los valores a razón del espacio en blanco
    document.getElementById("sensor1").innerHTML=Sensores[0];//Muestra el primer valor en la etiqueta
    document.getElementById("sensor2").innerHTML=Sensores[1];//Muestra el segundo valor en la etiqueta
  }
  

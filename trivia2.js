/* 1-recibir el archivo pregun.txt y separar los datos con el formato:
 <pregunta> para dividir preguntas
 <RES> para dividir la pregunta, y las respuestas
 2- identificar variables dentro del arreglo pregunta.
 REFERENCIAS: 
 PRE=( pregunta)
 RTA=(opcion a)
 RTB=(opcion b)
 RTC=(opcion c)
 RTD=(opcion d)
 RC= (respuesta correcta)
 DAT= ( datos curiosos)
*/ 



/* ------------------------------------ ACA VA EL CONTROLADOR --------------------------------- */ 
var juego=false;
function onJoin(usuario){ // evento que ocurre cuando entra un usuario

if(juego==true){
agregarUsuario(usuario);
}

}

function onCommand(usuario,comando,tusuario,arg){ //evento que ocurre cuando un recibe texto # o /  
/*
  Aca hay que hacer los comandos para activar la trivia, y ver puntos.
*/
if(comando.substr(0,7)=="trivia " && usuario.level>=1){
 
 if(comando.substr(7)=="on"){
  // aca cuando prenden la trivia
  usuarios.length=0;
  contador=0;
  tiempoPregunta.start();
  print("\x0301\x06La trivia empesara en \x0304 40s...");
  registro()
  juego=true;
  } else if(comando.substr(7)=="off"){
  //aca cuando apagan la trivia
  trivia=false;
  juego=false;
  usuarios.length=0;
  tiempoPregunta.stop();
  tiempoRespuesta.stop();
  print("\x0301\x06La trivia ha sido Desactivada");
  }
}
if(comando.substr(0,6)=="puntos"){
mostrarPuntos(usuario);
}
if(comando.substr(0,7)=="linked "){
if(comando.substr(7)=="on"){
linked(nombresLink);
}else if(comando.substr(7)=="off"){
roomsLink=false;
nombresLink.length=0;
}
	
}
if(comando.substr(0,7)=="rondas "){
finalRonda=comando.substr(7);
print("\x0301\x06La cantidad de rondas ha sido establecida con éxito"); 
}


}
var roomsLink=false; // variable para identificar si esta activada la opcion de salas likeadas 
var trivia=false; // variable para identificar si esta la trivia activa o no.
var finalRonda=10;
function onTextBefore(usuario, texto){ //evento que ocurre antes de mostrar el texto 
/*
 Aca hay que recibir el texto, y llamar a las funciones, para identificar si la respuesta es correcta
 o no.
*/
if(trivia==true){
if(texto.startsWith(".")){
if(usuario.hasOwnProperty("respondio")==false || usuario.respondio==false){
	usuario.respondio=true;
respuesta(usuario,texto.substr(1));
} else {
print(usuario,"\x0301\x06solo tienes una chance por pregunta");
}
return "";
}
else{ return texto}
}
return texto //devuelve el texto
}

 



/* ------------------------------------ ACA VA LA VISTA --------------------------------- */ 
function onLoad(){
print("");
print("\x0301\x06X------ \x0304Script Trivia Multiple Choice by #;!м4]и[u;Ҳ'\x0301 --------X");
print("");
print("\x0304\x06     1- \x0301Activar la trivia con el comando \x0304/trivia on/off");
print("\x0304\x06     2- \x0301Activar la trivia para salas likeadas \x0304/linked on/off");
print("\x0304\x06     3- \x0301Para mostrar tus puntos \x0304/puntos");
print("\x0304\x06     4- \x0301Para establecer la cantidad de rondas \x0304/rondas +numero");
print("");
print("\x06    \x0301Para responder la trivia se debe poner un punto antes ---> \x0304.A");
print("");
print("\x0304\x06    \x07Sponsor del script team \x0301яɮ\x07");
print("");
print("\x0301\x06X------ \x0304Script Trivia Multiple Choice by #;!м4]и[u;Ҳ'\x0301 --------X");
cargarPreguntas()
} 

var mensajes={
	preguntas: {
    rondas:"\x06\x0301 \x07La Ronda\x07 \x0304$ronda\x0301 esta comenzando...(I)",
	mensajeP:"\x06\x0301 \x07La pregunta es\x07: \x0304$pregunta",
	opcionA:"\x06\x0301 A. -\x07\x0304$opcionA\x07",
	opcionB:"\x06\x0301 B. -\x07\x0304$opcionB\x07",
	opcionC:"\x06\x0301 C. -\x07\x0304$opcionC\x07",
	opcionD:"\x06\x0301 D. -\x07\x0304$opcionD\x07"
	},
	respuestas:{
		datocurioso:"\x06\x0301\x07Dato curioso: \x0304$dato",
		finaltiempo:"\x06\x0301 Se les acabo el tiempo...(O)",
		respose:"\x07\x06\x0301 La respuesta era: \x0304$respuesta",
		correcto:"",
		incorrecto:""
	},
	comandos:{
	},
	registros:{
	},
	trivia :{
		final:"",
		partida: ""
	}
	
}

// En esta parte van a ir los timers para lanzar las preguntas
var contador=0; // cuenta el total de rondas;
var tiempoPregunta = new Timer();
tiempoPregunta.interval=30000; // tiempo para ejecutar una vista cada 40s
tiempoPregunta.oncomplete=function(){
/*
    Aca va lo que sucede cada 40s
*/
alfa(usuarios)
formato(arregloTemporal,contador);
contador++;
}
var tiempoRespuesta= new Timer();
tiempoRespuesta.interval=15000; // el tiempo en el que tiene que responder 20s
tiempoRespuesta.oncomplete=function(){
	/*
	 Aca va lo que sucede cada 20s
	*/
 mostrarResultado(rc,dat);
 trivia=false;
}

	 

/* ------------------------------------ ACA VA LA LOGICA --------------------------------- */ 
function mostrarResultado(rc,dat){
 if(Link.linked==true){
	 if(nombresLink.length>1){
 leaf0.print(mensajes.respuestas["finaltiempo"]);
 leaf0.print("");
 leaf0.print(mensajes.respuestas["respose"].replace("$respuesta",rc));
 leaf0.print("");
 leaf0.print(mensajes.respuestas["datocurioso"].replace("$dato",dat));
 leaf1.print(mensajes.respuestas["finaltiempo"]);
 leaf1.print("");
 leaf1.print(mensajes.respuestas["respose"].replace("$respuesta",rc));
 leaf1.print("");
 leaf1.print(mensajes.respuestas["datocurioso"].replace("$dato",dat));
	 }
	 else if(nombresLink.length>0){
 print(mensajes.respuestas["finaltiempo"]);
 print("");
 print(mensajes.respuestas["respose"].replace("$respuesta",rc));
 print("");
 print(mensajes.respuestas["datocurioso"].replace("$dato",dat));
 leaf0.print(mensajes.respuestas["finaltiempo"]);
 leaf0.print("");
 leaf0.print(mensajes.respuestas["respose"].replace("$respuesta",rc));
 leaf0.print("");
 leaf0.print(mensajes.respuestas["datocurioso"].replace("$dato",dat));
	 } 
 }
 print(mensajes.respuestas["finaltiempo"]);
 print("");
 print(mensajes.respuestas["respose"].replace("$respuesta",rc));
 print("");
 return print(mensajes.respuestas["datocurioso"].replace("$dato",dat));
}


function mostrarPuntos(usuario){
if(buscarUsuario(usuario)==false){
return print(usuario,"\x0301\x06No tenes puntuacion");
} else {
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 Tienes un total de: \x0304"+usuarios[buscarUsuario(usuario)].puntaje+"\x0301 Puntos");
}
}
//arreglo global para los nombres de la salas.
var nombresLink=[];
function linked(rooms){
	Link.leaves(function (l){
       rooms.push(l.name);	
	})
	roomsLink=true;
	return print("\x0301\x06La trivia para salas likeadas ha sido Activada");
}
var leaf0;  // variables globales
var leaf1; // donde almacenar el objeto de las salas likeadas 
function preguntarLink(pregunta,ronda){ // mostrar los mansajes a las salas likeadas y obtener sus objetos 
if(nombresLink.length>1){
leaf0 = Link.leaf(nombresLink[0]);
leaf1 = Link.leaf(nombresLink[1]);
if(ronda<=finalRonda){

leaf0.print(mensajes.preguntas["rondas"].replace("$ronda",ronda));  
leaf0.print(mensajes.preguntas["mensajeP"].replace("$pregunta",pregunta));
leaf0.print(mensajes.preguntas["opcionA"].replace("$opcionA",rta));
leaf0.print(mensajes.preguntas["opcionB"].replace("$opcionB",rtb));
leaf0.print(mensajes.preguntas["opcionC"].replace("$opcionC",rtc));
leaf0.print(mensajes.preguntas["opcionD"].replace("$opcionD",rtd));
leaf1.print(mensajes.preguntas["rondas"].replace("$ronda",ronda));  
leaf1.print(mensajes.preguntas["mensajeP"].replace("$pregunta",pregunta));
leaf1.print(mensajes.preguntas["opcionA"].replace("$opcionA",rta));
leaf1.print(mensajes.preguntas["opcionB"].replace("$opcionB",rtb));
leaf1.print(mensajes.preguntas["opcionC"].replace("$opcionC",rtc));
leaf1.print(mensajes.preguntas["opcionD"].replace("$opcionD",rtd));

} else {
 leaf0.print("\x0301\x06La trivia llego a su final");
 return leaf1.print("\x0301\x06La trivia llego a su final");
}
} else if(nombresLink.length>0){
leaf0= Link.leaf(nombresLink[0]);
if(ronda<=finalRonda){

leaf0.print(mensajes.preguntas["rondas"].replace("$ronda",ronda));  
leaf0.print(mensajes.preguntas["mensajeP"].replace("$pregunta",pregunta));
leaf0.print(mensajes.preguntas["opcionA"].replace("$opcionA",rta));
leaf0.print(mensajes.preguntas["opcionB"].replace("$opcionB",rtb));
leaf0.print(mensajes.preguntas["opcionC"].replace("$opcionC",rtc));
leaf0.print(mensajes.preguntas["opcionD"].replace("$opcionD",rtd));
} else {
 return leaf0.print("\x0301\x06La trivia llego a su final");
}
} else { return print("\x0301\x06No hay salas likeadas");}

}
function preguntar(pregunta,ronda){  // recibe la pregunta y la lanza a la vista.
if(ronda<=finalRonda){
print(mensajes.preguntas["rondas"].replace("$ronda",ronda));  
print(mensajes.preguntas["mensajeP"].replace("$pregunta",pregunta));
print(mensajes.preguntas["opcionA"].replace("$opcionA",rta));
print(mensajes.preguntas["opcionB"].replace("$opcionB",rtb));
print(mensajes.preguntas["opcionC"].replace("$opcionC",rtc));
print(mensajes.preguntas["opcionD"].replace("$opcionD",rtd));
tiempoRespuesta.start();
tiempoPregunta.start();
trivia=true;
rapidez=0;
return print("");
}else{
tiempoPregunta.stop();
tiempoRespuesta.stop();	
trivia=false;
juego=false;
ronda=0;
contador=0;
obtenerGanadores();   
print("\x0301\x06La trivia llego a su final");
return print("\x0301\x06Para volver a jugar \x0304/trivia on");                                       // llamar a mostrar Ganadores								  
}

}
/*
Variables globales donde estara almacenada los datos de la pregunta actual.

var preguntaActual;
var rta;
var rtb;
var rtc;
var rtd;
var rc;
var dat;


*/ 
var rapidez=0;
function respuesta(usuario,texto){  // recibe la respuesta y verifica si es correcta o no, y llama a puntuacion
usuario.respondio=true;
switch(texto){
case rta:
case "A":
case "a":
if(rta==rc){
rapidez++;
puntuacion(usuario,rapidez);
} else {
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 tu respuesta ha sido incorrecta");
}
break;
case rtb:
case "B":
case "b":
if(rtb==rc){
rapidez++;
puntuacion(usuario,rapidez);
} else {
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 tu respuesta ha sido incorrecta");
}
break;
case rtc:
case "C":
case "c":
if(rtc==rc){
rapidez++;
puntuacion(usuario,rapidez);
} else {
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 tu respuesta ha sido incorrecta");
} 
break;
case rtd:
case "D":
case "d":
if(rtd==rc){
rapidez++;
puntuacion(usuario,rapidez);
}else {
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 tu respuesta ha sido incorrecta");
}
break;
default:
return print(usuario,"\x0304\x06"+usuario.name+"\x0301 tu respuesta ha sido incorrecta");
}
}

function puntuacion(usuario,rapidez){ // recibe el usuario, y le da una puntuacion dependiendo de la rapidez 
switch(rapidez){
case 1:
usuarios[buscarUsuario(usuario)].puntaje+=10;
print(0,"\x0304\x06"+usuario.name+"\x0301 Respondio correctamente y se llevo 10 puntos");

return print(usuario, "\x0301\x06Bien hecho segui asi y seguro ganas \x0304"+usuario.name);
break;
case 2:
usuarios[buscarUsuario(usuario)].puntaje+=5;
print(0,"\x0304\x06"+usuario.name+"\x0301 Respondio correctamente y se llevo 5 puntos");

return print(usuario, "\x0301\x06ayyyyy casi respondes primero \x0304"+usuario.name);
break;
case 3:
usuarios[buscarUsuario(usuario)].puntaje+=3;
print(0,"\x0304\x06"+usuario.name+"\x0301 Respondio correctamente y se llevo 3 puntos");

return print(usuario, "\x0301\x06Apura los dedos, se te estan adelantando \x0304"+usuario.name );
break;

default:
usuarios[buscarUsuario(usuario)].puntaje+=1;
print(0,"\x0304\x06"+usuario.name+"\x0301 Respondio, correctamente y se llevo 1 puntos ");

return print(usuario, "\x0301\x06Apura los dedos, vas a perder \x0304"+usuario.name);
}

}

var usuarios = [{name:"usuario",puntaje:0}]; // arreglo para guardar puntuación de los usuarios y sus nombres.

function registro(){   // agrega a todo los jugadores;
if(usuarios.length<1){
Users.local(function(u){
u.respondio=false;
usuarios.push({name:u.name,puntaje:0});
print(u,"\x0304\x06"+u.name+"\x0301Estas en la lista de jugadores, puedes responder \x0304\".\"+\x0301 el la respuesta escrita, o la opcion \x0304A,B,C,D");
})
if(roomsLink==true){
	if(Link.linked==true){
Users.linked(function(u){
if(buscarUsuario(u)==false){
usuarios.push({name:u.name,puntaje:0,respondio:false});
u.respondio=false;
print(u,"\x0304\x06"+u.name+"\x0301 Estas en la lista de jugadores, puedes responder \x0304\".\"+ \x0301el la respuesta escrita, o la opcion \x0304A,B,C,D");
}
});
}}
}
return print("\x0301\x06 Todos los usuarios actuales de la sala han sido agregado a la lista de la trivia");
}

function buscarUsuario(usuario){ //recibe el objeto usuario, y verifica si existe en la base de datos, devuelviendo su posicion dentro del arreglo
 if(usuarios.length>0){
  for(var i=0;i<usuarios.length;i++){
     if(usuarios[i].name==usuario.name){
	 return i;
	 }
  }
  return false;
 }
}


function agregarUsuario(usuario){ //agrega un nuevo usuario a la base de datos 
if(buscarUsuario(usuario)!=false){
	return print(usuario,"\x0304\x06"+usuario.name+"\x0301 Ya Estas en la lista de jugadores");
} else {
	 usuario.respondio=false;
	 usuarios.push({name:usuario.name,puntaje:0});
	 print(usuario,"\x0304\x06"+usuario.name+" \x0301Estas en la lista de jugadores, puedes responder \".\"+ el la respuesta escrita, o la opcion \x0304A,B,C,D")
	 return print(usuario,"\x0304\x06"+usuario.name+" \x0301Has sido agregado a la Lista de jugadores");
}
}
// Formato de usuarios[name,puntaje]

//Formato del top 
function mostrarGanadores(arreglo){ // mostrar los ganadores, con su puntaje respectivo
for(i=0;i<arreglo.length;i++){
	print("   \x06\x0301"+arreglo[i]);
	}

}

function seguridad(usuario){
	Users.local(function(u){
	if(u.name==usuario){	
       u.respondio = false;
	}});
	Users.linked(function (u)
{
if(u.name==usuario){
       u.respondio = false;
}
})
}
function alfa(prop){
for(var i=0;i<prop.length;i++){
seguridad(prop[i].name);
}
return;
} 
function mostrarArreglo(arreglo,leaf){
for(var i=0;i<arreglo.length;i++){
leaf.print("   \x06\x0301"+arreglo[i]);
}

}

function mostrarGanadoresLinked(arreglo,num,puntaje){
	if(roomsLink==true){
	if(Link.linked==true){
	if(nombresLink[0].length>0){
		switch(num){
		case 1:
		leaf0.print("\x0301\x06X------------- \x0304TOP 1\x0301 --------------X");
        leaf0.print("");
        mostrarArreglo(arreglo[1],leaf0);
        leaf0.print("Con un puntaje total: "+puntaje+" Puntos");
        leaf0.print("");
		break;
		case 2:
		leaf0.print("\x0301\x06X------------- \x0304TOP 2\x0301 --------------X");
        leaf0.print("");
        mostrarArreglo(arreglo[2],leaf0);
        leaf0.print("\x0301\x06Con un puntaje total: \x0304"+puntaje+"\x0301 Puntos");
        leaf0.print("");
		break;
		case 3:
		leaf0.print("\x0301\x06X------------- \x0304TOP 3\x0301 --------------X");
        leaf0.print("");
        mostrarArreglo(arreglo[3],leaf0);
        leaf0.print("\x0301\x06Con un puntaje total: \x0304"+puntaje+"\x0301 Puntos");
        leaf0.print("");
		break;
		
		}
		
	}
	if(nombresLink[1].length>0){
	
		switch(num){
		case 1:
		leaf1.print("\x0301\x06X------------- \x0304TOP 1 \x0301--------------X");
        leaf1.print("");
        mostrarArreglo(arreglo[1],leaf1);
        leaf1.print("\x0301\x06Con un puntaje total: \x0304"+puntaje+"\x0304 Puntos");
        leaf1.print("");
		break;
		case 2:
		leaf1.print("\x0301\x06X------------- \x0304TOP 2\x0301 --------------X");
        leaf1.print("");
        mostrarArreglo(arreglo[2],leaf1);
        leaf1.print("\x0301\x06Con un puntaje total: \x0304"+puntaje+"\x0301 Puntos");
        leaf1.print("");
		break;
		case 3:
		leaf1.print("\x0301\x06X------------- \x0304TOP 3\x0301 --------------X");
        leaf1.print("");
        mostrarArreglo(arreglo[3],leaf1);
        leaf1.print("\x0301\x06Con un puntaje total: \x0304"+puntaje+"\x0301 Puntos");
        leaf1.print("");
		break;
		}
	
	}
	
	}
	
	}
	
}

function obtenerGanadores(){
var list = new List(); // declaramos una lista exclusiva del server sb0t
var primero; // mayor puntaje
var segundo; // segundo mayor puntaje
var tercero; // tercer mayor puntaje
var top = {1:[],2:[],3:[]}; // objeto de nombres del top 1,2, y 3
if(usuarios.length>0){
for(var i=0;i<usuarios.length;i++){// obtenemos todos los puntajes de los usuarios y lo agregamos a la lista
	list.add(usuarios[i].puntaje);
}
list.sort(function (x, y) { return x < y ? 1 : x > y ? -1 : 0; }); // lo ordenamos de mayor a menor
primero=list[0] // asignamos mayor puntaje
list.removeAll(function (q) { return q >= primero; }); // eliminamos coinsidencias
segundo=list[0] // asignamos el segundo mayor puntaje
list.removeAll(function (q) { return q >= segundo; }); // eliminamos coinsidencias
tercero=list[0] // asiganmos el tercer mayor puntaje
for(x=0;x<usuarios.length;x++){
     if(usuarios[x].puntaje==primero){
     top[1].push(usuarios[x].name);
	 } else if(usuarios[x].puntaje==segundo){
	 top[2].push(usuarios[x].name); 
	 } else if(usuarios[x].puntaje==tercero){
	 top[3].push(usuarios[x].name);
	 }
}
if(primero>0){
mostrarGanadoresLinked(top,1,primero);
print("\x0301\x06X------------- \x0304TOP 1 \x0301--------------X");
print("");
mostrarGanadores(top[1]);
print("\x0301\x06Con un puntaje total\x0304: "+primero);
print("");
}
if(segundo>0){
mostrarGanadoresLinked(top,2,segundo);
print("\x0301\x06X------------- \x0304TOP 2\x0301 --------------X");
mostrarGanadores(top[2]);
print("\x0301\x06Con un puntaje total\x0304: "+segundo);
print("");
}
if(tercero>0){
mostrarGanadoresLinked(top,3,tercero);
print("\x0301\x06X------------- \x0304TOP 3\x0304 --------------X");
mostrarGanadores(top[3]);
print("\x0301\x06Con un puntaje total\x0304: "+tercero);
}
} else {
return print("\x0301No hay jugadores en la partida");
}
}

/* ------------------------------------------------- Todo lo relacionado a cargar, y guardar Preguntas ---------------------------------------- */
var arregloTemporal; // arreglo para cargar las preguntas separadas

function cargarPreguntas(){
if(!File.exists("pregun.txt")){ //averiguo si no existe el archivo
	return print("Error el Archivo no Existe."); //imprimo el error
} else { // si existe 
	arregloTemporal= File.load("pregun.txt").split("\<pregunta\>"); // cargo el archivo
	return print("\x0301\x06Preguntas Cargadas con Exito"); //imprimo si se carga correctamente
}
}
/*
Variables globales donde estara almacenada los datos de la pregunta actual.
PRE=
RTA=
RTB=
RTC=
RTD=
RC=
DAT=  
*/ 
var preguntaActual;
var rta;
var rtb;
var rtc;
var rtd;
var rc;
var dat;
if(!String.prototype.startsWith){ // funcion  para identificar si el arreglo comienza con una cadena en especial
	String.prototype.startsWith = function (str) {
		return !this.indexOf(str);
		    }
}  

function formato(preguntas,ronda){ // aca vamos a dividir las preguntas en un arreglo para luego reconocerlas la funcion respuesta, y preguntar 
if(preguntas.length>0){ // se cumple si el arreglo tiene elementos 
var indice = Math.floor(Math.random() * (preguntas.length - 0) + 0); // generamos un numero aleatorio entre el max elemento y el min del arreglo 
var elementos = preguntas[indice].split("\<RES\>"); // obtiene una pregunta del arreglo, y divide sus elementos 
if(elementos.length>0){ // se cumple cuando el arreglo tiene elementos 
preguntaActual= elementos[0].replace("PRE=","");
for(var i=0; i<elementos.length;i++){ // recorremos todo el arreglo 
       if(elementos[i].startsWith("PRE=")){ //obtenemos la pregunta no funciona
	   preguntaActual= elementos[i].replace("PRE=","");
	   } else if(elementos[i].startsWith("RTA=")){ //obtenemos rta
	   rta= elementos[i].replace("RTA=","");
	   } else if(elementos[i].startsWith("RTB=")){ //obtenemos rtb
	   rtb= elementos[i].replace("RTB=","");
	   } else if(elementos[i].startsWith("RTC=")){ //obtenemos rtc
	   rtc= elementos[i].replace("RTC=",""); 
	   } else if(elementos[i].startsWith("RTD=")){ //obtenemos rtd
	   rtd= elementos[i].replace("RTD=","");
	   } else if(elementos[i].startsWith("RC=")){ //obtenemos rc
	   rc= elementos[i].replace("RC=","");
	   } else if(elementos[i].startsWith("DAT=")){ //obtenemos dat
	   dat= elementos[i].replace("DAT=","");
	   }
        }
		if(roomsLink==true){
		 if(Link.linked==true){
		 preguntarLink(preguntaActual,ronda); //llamamos a la funcion si tiene otras salas likeadas.
         } else{
			print("\x0301\x06La sala no esta likeada apagar la funcion con el comando \x0304/linked off");
		 }		 
		}
		return preguntar(preguntaActual,ronda); // llamamos a la funcion preguntar y le enviamos la ronda actual, y la Pregunta Actual 
	    
	}
  }
  return print("Error, verificar el formato de la pregunta: "+indice);
}

const apiKey="FjgjgADzkSVKIJbY926p4qqcOtIVCzeA";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";
let logo= document.querySelector(".icono");
let imgCamara= document.querySelector("#imgCamara");
let form = new FormData();

let classBody= sessionStorage.getItem("classBody")
console.log(classBody);

if (classBody=="dark"){
  document.body.classList.toggle("dark");
  logo.src= "assets/gifOF_logo_dark.png";
  imgCamara.src = "assets/camera_light.svg";
}

const video = document.querySelector("video");

let recorder;
let detenerCamara = null;

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,

      video: {
        height: { max: 480 }
      }
    })

    .then(function(stream) {
      video.srcObject = stream;
      detenerCamara = stream;
      video.play();
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
  

        onGifRecordingStarted: function() {
          console.log("started");
        }
      });
    });
}

function uploadGif(gif) {
  
  fetch("https://upload.giphy.com/v1/gifs" + "?api_key=" + apiKey, {
    method: "POST", // or 'PUT'
    body: gif
  })
    .then(res => {
      console.log(res.status);
      if (res.status != 200) {
        uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
      }
      return res.json();
    })
    .then(data => {
      
      saveGifLocalStorage(data.data.id)
      let creadoGif= fetch('http://api.giphy.com/v1/gifs/'+data.data.id+'?api_key='+ apiKey)
    .then(response => {
        return response.json();
    })
    .then(data =>{
      let objeto= data.data.images.fixed_height.url;
      let botonLink= document.getElementById("btnLink");
      botonLink.setAttribute("href", objeto);
        })
    .catch(error => {
        return error;
    });
    return creadoGif;
    })
    .catch(error => {
      uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
      console.error("Error:", error);
    });

}
function saveGifLocalStorage(id){
    localStorage.setItem(`${id}`, JSON.stringify(id))
}

function mostrarFlecha(){
document.querySelector(".arrow").style.display= "block";}

mostrarFlecha();

let botonArrow= document.querySelector(".arrow");
botonArrow.addEventListener("click", () =>{
  window.open("index.html", '_self');})

let botonComenzar= document.querySelector(".botonComenzar");
botonComenzar.addEventListener("click", () =>{
        document.querySelector(".winCrear").style.display= "none";
        document.querySelector(".chequeoCaptura").style.display= "block";
        document.querySelector(".misGifs").style.display= "none";
        getStreamAndRecord();
    })

let botonCaptura= document.querySelector(".botonCapturar");
botonCaptura.addEventListener("click", () =>{
        document.querySelector(".botonListo").style.display= "flex";
       botonCaptura.style.display= "none";
        document.querySelector(".arrow").style.display= "block";
        document.querySelector(".winCrear").style.display= "none";
        let textoTitulo = document.querySelector("#tituloCaptura");
        textoTitulo.innerHTML="Capturando tu Guifo"; 
        recorder.startRecording();
      })      
        
let botonListo= document.querySelector(".botonListo");
botonListo.addEventListener("click", () =>{
  document.querySelector(".botonListo").style.display= "none"; 
  document.querySelector("#btnRepetir").style.display= "block";
  document.querySelector("#btnRepetir").style.margin = "16px"
  document.querySelector("#btnSubir").style.display= "block";
  document.querySelector("#btnSubir").style.margin= "16px"
  let textoTitulo = document.querySelector("#tituloCaptura");
  textoTitulo.innerHTML="Vista Previa"; 
  recorder.stopRecording(function() {  
      form.append("file", recorder.getBlob(), "myGif.gif");
        let imagen = document.createElement("img");
        imagen.src = URL.createObjectURL(recorder.getBlob());
        imagen.className = "preGuifo";
        let video = document.querySelector("video");
        let divVideo = document.querySelector(".videoGuifo");
        divVideo.removeChild(video);
        divVideo.appendChild(imagen);})

  })   
  
let botonRepetir= document.querySelector("#btnRepetir");
botonRepetir.addEventListener("click", () =>{
window.open("upload.html", '_self');
})

let botonCancelar= document.querySelector(".botonCancelar");
botonCancelar.addEventListener("click", () =>{
window.open("index.html", '_self');
})

let btnCancelar= document.querySelector("#btnCancelar");
btnCancelar.addEventListener("click",
() =>{window.open("index.html", '_self');}
)

let botonFinGuifo= document.querySelector("#btnListo");
botonFinGuifo.addEventListener("click", () =>{
window.open("index.html", '_self');
})

let botonLink= document.getElementById("btnLink");
botonLink.addEventListener("click", () =>{
  let url= botonLink.getAttribute("href");
  navigator.clipboard.writeText(url);
  window.open(url, "_blank");
 let popUp = document.querySelector(".popUp");
    popUp.style.display= "block";
    setTimeout(() => {
      popUp.style.display= "none";
    }, 3000);
})

const loadingSquares = document.querySelectorAll(".square");
var myVar;
const barLenght = loadingSquares.length;
let intervalCounter = 0;

function pintar(){
        loadingSquares[intervalCounter].classList.remove("square");
        loadingSquares[intervalCounter].classList.add("square-pink");
        console.log("entro")
        intervalCounter++;
        if (intervalCounter== 8){
          clearInterval(myVar);
          guifoCreadoExito();
        }
      }
              
let botonSubir= document.querySelector("#btnSubir");
botonSubir.addEventListener("click", () =>{
  let divVideo = document.querySelector(".videoGuifo");
  let imgSubiendo = document.querySelector(".subiendoGuifo");
  let textoTitulo = document.querySelector("#tituloCaptura");
  textoTitulo.innerHTML="Subiendo Guifo";
  imgSubiendo.style.display= "flex";
  let giffo = document.querySelector(".preGuifo");
  divVideo.removeChild(giffo);
  divVideo.appendChild(imgSubiendo);
  document.querySelector("#btnRepetir").style.display = "none"
  document.querySelector("#btnSubir").style.display= "none";
  document.querySelector("#btnCancelar").style.display = "block";
  uploadGif(form);
  detenerCamara.getTracks().forEach(track => track.stop());
  myVar= setInterval (pintar, 800);
}) 

function guifos(){
  document.querySelector(".misGifs").style.display= "block";
  if (localStorage.length != 0) {
  for(let i=0; i<=localStorage.length; i++){
      let clave = localStorage.key(i);
      let idGif = localStorage.getItem(clave).slice(1, -1);
      let creadoGif= fetch('http://api.giphy.com/v1/gifs/'+idGif+'?api_key='+ apiKey)
      .then(response => {
      return response.json(); })
      .then(data =>{
              let objeto= data.data.images.fixed_height.url;
              let imagen = document.createElement("img");
              imagen.src = objeto;
              imagen.className= "imgGuifo";
              let divGuifos = document.querySelector("#imagenesGuifos");
              divGuifos.appendChild(imagen);
           })
           .catch(error => { return error; 
          }); 
          
    }    
}}


guifos();


function guifoCreadoExito (){
  let divVideo = document.querySelector(".videoGuifo");
  document.querySelector("#btnCancelar").style.display = "none";
  document.querySelector("#btnListo").style.display = "block";
  document.querySelector("#btnLink").style.display = "block";
  document.querySelector("#btnLink").style.margin = "16px"
  document.querySelector("#btnListo").style.margin = "16px"
  let textoTitulo = document.querySelector("#tituloCaptura");
  textoTitulo.innerHTML="Guifo subido con Exito";
  let img = document.createElement("img");
  let imgSubiendo = document.querySelector(".subiendoGuifo");
  divVideo.removeChild(imgSubiendo);
  img.src = URL.createObjectURL(recorder.getBlob());
  img.className = "preGuifo";
  document.querySelector(".misGifs").style.display= "block";
  divVideo.appendChild(img);

}


    

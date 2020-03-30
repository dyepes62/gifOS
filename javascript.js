const apiKey="FjgjgADzkSVKIJbY926p4qqcOtIVCzeA";
let logo= document.querySelector(".icono");
let lupa= document.querySelector("#imagenLupa");
let classBody= sessionStorage.getItem("classBody")

let botonDark= document.querySelector("#night");
botonDark.addEventListener("click", dark);

let botonLight = document.querySelector("#day");
botonLight.addEventListener("click", light);

function dark() {
document.body.classList.toggle("dark");
logo.src= "assets/gifOF_logo_dark.png";
sessionStorage.setItem("classBody", "dark")
lupa.src= "assets/lupa_light.svg"
} 

function light(){
document.body.classList.toggle("dark"); 
logo.src= "assets/gifOF_logo.png";
sessionStorage.setItem("classBody", "light");
} 

if (classBody=="dark"){
    dark();
  }else if (classBody== "light"){
      light();
  }

function hoyTeRecomendamos (){
    let datosBusqueda= fetch('https://api.giphy.com/v1/gifs/trending?' + '&api_key='+ apiKey+ '&limit=4&rating=G')
    .then(response => {
        return response.json();
    })
    .then(data =>{
        let i= 1;
        data.data.forEach ((element)=>{
        let objeto= element.images.fixed_height.url;
        let titulo= element.title;
        let divTendencia = document.getElementById("imgsug"+i);
        let imagen = document.createElement("img");
        imagen.setAttribute("src", objeto);
        imagen.className= "imgTendencia";
        divTendencia.appendChild(imagen);
        let hashtag = titulo.split(" ")[0]+titulo.split(" ")[1];
        let hashTendencia = document.getElementById("hashtag"+i);
        hashTendencia.innerHTML= "#"+hashtag;
        i= i+1;
        })})
    .catch(error => {
        return error;
    });
return datosBusqueda;
}

hoyTeRecomendamos();

function getTendencias(){
    let datosBusqueda= fetch('https://api.giphy.com/v1/gifs/trending?' + '&api_key='+ apiKey+ '&offset=4&limit=17&rating=G')
    .then(response => {
        return response.json();
    })
    .then(data =>{
        let i= 1;
        console.log(data.data);
        data.data.forEach ((element)=>{
        let objeto= element.images.fixed_height.url;
        let titulo = element.title;
         let divTendencia = document.getElementById("imagenTendencia");
         let imagen = document.createElement("img");
         let div=document.createElement("div");
         imagen.setAttribute("src", objeto);
         imagen.className= "styleImgTendencia";
         imagen.id= "imgTendencia"+i;
         div.id="tendencia"+i;
         let barra= document.createElement("h2");
        div.appendChild(imagen); 
        div.appendChild(barra);
        divTendencia.appendChild(div);
        barra.className= "barraPrimeraTendencia";
        barra.innerHTML= "#"+ titulo.split(" ")[0] + " #" +titulo.split(" ")[1];
        barra.style.display = "none";
        barra.id= "barra"+i;
        imagen.onmouseover =   () =>{
            let titulo=  imagen.id;
            let numero= titulo.slice(12);
            let barra = document.getElementById("barra"+numero);
            let div= document.getElementById("tendencia"+numero);
            div.classList.add("tendenciaStyle");
            barra.style.display= "block";
        };
        imagen.onmouseout =  () =>{
            let titulo=  imagen.id;
            let numero= titulo.slice(12);
            let barra = document.getElementById("barra"+numero);
            let div= document.getElementById("tendencia"+numero);
            barra.style.display= "none";
            div.classList.remove("tendenciaStyle");
        };
        i=i+1;
        })
        let barra1= document.getElementById("barra1");
        barra1.style.display= "block";
    })
    .catch(error => {
        return error;
    });
       
return datosBusqueda;

}



function cambioClaseHoverImg(a, barra){
a.classList.add("tendenciaStyle");
barra.style.display= "block";
}

function cambioClaseHoverOut(a,barra){
    a.classList.remove("tendenciaStyle");
    barra.style.display= "none";
    }

getTendencias();

function traerimagen(){

}



let contBusqueda=0;
function getBusquedaResults(search){
    document.querySelector(".arrow").style.display= "block";
    let claseBody= document.body.classList.value;
    var image= document.getElementById('imagenLupa'); 
    if (claseBody=="dark"){
        image.setAttribute("src","assets/lupa_light.svg");
                }else{
             image.setAttribute("src","assets/lupa.svg");
                }
    if (search !== "") {
    contBusqueda= contBusqueda+1;    
    sessionStorage.setItem("busqueda"+contBusqueda, search);
    let divbotones= document.getElementById("botonesBusqueda");
    divbotones.innerHTML="";
    for(let i=1; i <= contBusqueda; i++){
        let busqueda= sessionStorage.getItem("busqueda"+i);
        let boton = document.createElement("button");
        boton.className ="botBusqueda";
        boton.innerHTML= "#"+ busqueda;
        divbotones.appendChild(boton);
        boton.onclick =  () => {BusquedaBotones(boton.innerHTML.slice(1))};
    }
    document.getElementById("resultBusqueda").style.display= "none";
    boton= document.getElementById("buttonBuscar");
    boton.className= "botonBuscarActive";
    document.getElementById("botonesBusqueda").style.display= "block";
    document.getElementById("sugerencia").style.display= "none";
    let datosBusqueda= fetch('https://api.giphy.com/v1/gifs/search?q='+ search + '&api_key='+ apiKey + '&offset=4&limit=17&rating=G')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let i= 1;
        data.data.forEach ((element)=>{
            let objeto= element.images.fixed_height.url;
            let titulo= element.title;
            let imagen = document.getElementById("imgTendencia"+i);
            let barra= document.getElementById("barra"+i);
            imagen.setAttribute("src", objeto);
            let tituloBusqueda = document.querySelector(".h3_tendencia");
            barra.innerHTML= "#"+ titulo.split(" ")[0] + " #" +titulo.split(" ")[1]
            let searchM= search.charAt(0).toUpperCase() + search.slice(1);
            tituloBusqueda.innerHTML = searchM +" [resultados]";
           i=i+1;
            })})
    .catch(error => {
        return error;
    });
return datosBusqueda;

}else {
    document.getElementById("botonesBusqueda").style.display= "none";
    document.getElementById("sugerencia").style.display= "block"; 
}
}  


let inputBuscar= document.querySelector("#inputBusqueda");
    inputBuscar.addEventListener("keypress", cambiosInput);

  
 function cambiosInput(){       
    let valorinput= document.getElementById("inputBusqueda").value;
   if (valorinput !== ""){
        document.getElementById("resultBusqueda").style.display= "block";
        boton= document.getElementById("buttonBuscar");
        boton.className= "botonBuscarInput";
        let datosBusqueda= fetch('https://api.giphy.com/v1/gifs/trending?' + '&api_key='+ apiKey+ '&limit=3&rating=G')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            let i= 1;
            let claseBody= document.body.classList.value;
            var image= document.getElementById('imagenLupa'); 
           if (claseBody=="dark"){
            image.setAttribute("src","assets/lupa_light.svg");
                    }else{
                 image.setAttribute("src","assets/lupa.svg");
                    }
            data.data.forEach ((element)=>{
            let titulo= element.title;
            let result = document.getElementById("result"+i);
            result.innerHTML= titulo;
            i= i+1;
            })})
        .catch(error => {
            return error;
        });
    return datosBusqueda;
   }else{
    document.getElementById("resultBusqueda").style.display= "none";
    var image= document.getElementById('imagenLupa'); 
    image.setAttribute("src","assets/lupa_inactive.svg");
    boton= document.getElementById("buttonBuscar");
    boton.className= "botonBuscar";
   }
}

inputBuscar.addEventListener("click", cambiosInput);

function guifos(){
    document.querySelector(".busqueda").style.display= "none";
    document.querySelector("#sugerencia").style.display= "none";
    document.querySelector(".arrow").style.display= "block";
    document.querySelector(".tendencia").style.display= "none";
    document.querySelector(".misGifs").style.display= "block";
    if (localStorage.length != 0) {
    for(let i=0; i<=localStorage.length; i++){
        let clave = localStorage.key(i);
        let idGif = localStorage.getItem(clave).slice(1, -1);
        let creadoGif= fetch('https://api.giphy.com/v1/gifs/'+idGif+'?api_key='+ apiKey)
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
             .catch(error => { return error; });    
    }    
}}
    
let botonMisGuifos= document.querySelector("#misGuifos");
botonMisGuifos.addEventListener("click", guifos)

let botonBuscar= document.querySelector("#buttonBuscar");
botonBuscar.addEventListener("click", () =>{
let search= document.getElementById("inputBusqueda").value;
getBusquedaResults(search);})

inputBuscar.onkeypress = function (e) {
    if (e.keyCode == 13) {
        let search= document.getElementById("inputBusqueda").value;
        getBusquedaResults(search);
    }
  }

let botonCrearGuifos= document.querySelector(".boton_crear");
botonCrearGuifos.addEventListener("click", () =>{
   window.open("upload.html",'_self');})

let botonArrow= document.querySelector(".arrow");
botonArrow.addEventListener("click", () =>{
    document.querySelector(".busqueda").style.display= "block";
    document.querySelector("#sugerencia").style.display= "block";
    document.querySelector(".arrow").style.display= "none";
    document.querySelector(".tendencia").style.display= "block";
    document.querySelector(".misGifs").style.display= "none";
})

let botonVerMas1= document.querySelector(".verMas1");
botonVerMas1.addEventListener("click", () =>{
search= document.querySelector("#hashtag1").innerHTML.slice(1); 
getBusquedaResults(search);})
let botonVerMas2= document.querySelector(".verMas2");
botonVerMas2.addEventListener("click", () =>{
search= document.querySelector("#hashtag2").innerHTML.slice(1); 
getBusquedaResults(search);})
let botonVerMas3= document.querySelector(".verMas3");
botonVerMas3.addEventListener("click", () =>{
search= document.querySelector("#hashtag3").innerHTML.slice(1); 
getBusquedaResults(search);})
let botonVerMas4= document.querySelector(".verMas4");
botonVerMas4.addEventListener("click", () =>{
search= document.querySelector("#hashtag4").innerHTML.slice(1); 
getBusquedaResults(search);})





function busBoton(){
    let search; 
    let idImagen=botonVerMas.parentNode.id;
   document.querySelector(".arrow").style.display= "block";
    switch( idImagen ){
        case "imgsug1":
             search= document.querySelector("#hashtag1").innerHTML.slice(1);         
                       break;
        case "imgsug2":
            search= document.querySelector("#hashtag2").innerHTML.slice(1);   
                       break;
        case "imgsug3":
            search= document.querySelector("#hashtag3").innerHTML.slice(1);  
                       break;
        case "imgsug4":
            search= document.querySelector("#hashtag4").innerHTML.slice(1);    
             break;}
getBusquedaResults(search);  
}


function BusquedaBotones(search){
    document.querySelector(".arrow").style.display= "block";
    document.getElementById("resultBusqueda").style.display= "none";
    boton= document.getElementById("buttonBuscar");
    boton.className= "botonBuscarActive";
    document.getElementById("botonesBusqueda").style.display= "block";
    document.getElementById("sugerencia").style.display= "none";
    let datosBusqueda= fetch('https://api.giphy.com/v1/gifs/search?q='+ search + '&api_key='+ apiKey + '&offset=4&limit=17&rating=G')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let i= 1;
        data.data.forEach ((element)=>{
            let objeto= element.images.fixed_height.url;
            let imagen = document.getElementById("imgTendencia"+i);
            imagen.setAttribute("src", objeto);
            let tituloBusqueda = document.querySelector(".h3_tendencia");
            let searchM= search.charAt(0).toUpperCase() + search.slice(1);
            tituloBusqueda.innerHTML = searchM +" [resultados]";
           i=i+1;
            })})
    .catch(error => {
        return error;
    });
return datosBusqueda;}



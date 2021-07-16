document.querySelector(".botao1").addEventListener("click", () => {
    document.querySelector("#id01").hidden = false
    document.querySelector(".modal").style.cssText = "display: flex; justify-content:center; align-items: center;"
}) 

document.querySelector("#botaoDesaparecer").addEventListener("click", () => {    
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
})

document.querySelector(".btnEntrar").addEventListener("click", () => {
    document.querySelector("#id01").style.display = "none"
})

document.querySelector(".btnEntrar").addEventListener("click", () => {
    let usuario = document.querySelector(".login").value;
    let senha = +document.querySelector(".senha").value;
    
    console.log(`senha: ${senha} login: ${usuario}`)

    if (usuario == "admin" && senha == "1234") {
        window.location.href = "Cadastrar turmas.html";
        window.location.replace("Cadastrar turmas.html");
    } else {
        alert("O login ou senha digitado está incorreto")
    }

    document.querySelector("#form").reset()
})

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}

document.querySelector(".enviar").addEventListener("click", () => {
  let nome = document.querySelector(".nome").value;
  let email = document.querySelector(".e-mail").value;

  if(nome == "" || email == "") {
    alert("Preencha os campos com os seus dados")
    document.querySelector(".enviarCTT").reset()
  } else if(!document.querySelector(".e-mail").validity.valid) {
    alert("Digite um e-mail valido")
    document.querySelector(".enviarCTT").reset()
    return
  } else {
     document.querySelector(".enviarCTT").reset()
     alert ("Contato enviado com sucesso")
  } 

  
})


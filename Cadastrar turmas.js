import { Turma } from "./Turma.js"

//Criando a função para o botão
document.querySelector(".botao1").addEventListener("click", () => showModal(salvarTurma))

//Criando função para o Pop-up desaparecer
document.querySelector("#botaoDesaparecer").addEventListener("click", () => {    
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
})


let turmas = JSON.parse(localStorage.getItem("turmas")) || []


function showModal(callback, turma) {
    document.querySelector("#id01").hidden = false
    document.querySelector(".modal").style.cssText = "display: flex; justify-content:center; align-items: center;"        
    document.querySelector(".btnSalvar").onclick = callback

    if (turma) {
        document.querySelector(".numeroTurma").value = turma.numeroTurma
        document.querySelector(".nomeTurma").value = turma.nomeTurma

        console.log(turma.periodoTurma);

        if (turma.periodoTurma == "Matutino") {
            document.querySelector(".horarioTurmaMatutino").click()
        } else if (turma.periodoTurma == "Vespertino") {
            document.querySelector(".horarioTurmaVespertino").click()
        }
        document.querySelector(".regente").value = turma.regente
        document.querySelector(".btnSalvar").onclick = () => callback(turma)
    } else {
        document.querySelector(".btnSalvar").onclick = callback
    }
}


function salvarTurma() {
    document.querySelector("#botaoDesaparecer")
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
    
    // Obtendo os valores do input
    let numeroTurma = +document.querySelector(".numeroTurma").value;
    let nomeTurma = document.querySelector(".nomeTurma").value;
    let periodoTurma = document.getElementById("form").periodo.value
    let regente = document.querySelector(".regente").value;
    let turma = new Turma(numeroTurma, nomeTurma, periodoTurma, regente)

    turmas.push(turma)   
    
    localStorage.setItem("turmas", JSON.stringify(turmas))

    adicionarTurma(turma)
    document.querySelector("#form").reset()
}

/**
 * @todo Implemetar essa função
 */
function editarTurma(turma) {
    turma.numeroTurma =  +document.querySelector(".numeroTurma").value;
    turma.nomeTurma = document.querySelector(".nomeTurma").value;
    turma.periodoTurma = document.getElementById("form").periodo.value
    turma.regente = document.querySelector(".regente").value;

    localStorage.setItem("turmas", JSON.stringify(turmas))

    document.querySelector("#form").reset()
    carregaTurmas()

    document.querySelector("#botaoDesaparecer")
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
}

// numeroTurma = document.querySelector("numeroTurma")




// Função para adicionar uma turma
function adicionarTurma(turma) {
    const divTurma = document.createElement("div")
    divTurma.className = "turma"
    divTurma.insertAdjacentHTML("afterbegin", `<button class = "botaoExcluir">x</button><p>Nome Turma: <a href=criarlinha.html?numeroTurma=${turma.numeroTurma}>${turma.nomeTurma}</a></p><p class="numeroTurma">Número da turma: ${turma.numeroTurma}</p><p>${turma.periodoTurma}</p><p>Regente: ${turma.regente}</p><button class = "editar">Editar</button>`)    
    document.querySelector("#turmas").append(divTurma)  
}

function carregaTurmas() {
    const divTurmas = document.querySelector("#turmas")    
    
    if (divTurmas.innerHTML) {
        console.log("vazio")
        divTurmas.innerHTML = ""
        for (let turma of turmas) {
            adicionarTurma(turma)
        }        
    } else {        
        for (let turma of turmas) {
            adicionarTurma(turma)
        }        
    } 
    
}

window.addEventListener("load", () => {  
    carregaTurmas()
})

document.querySelector("#turmas").addEventListener("click", event => {
     if (event.target.className === "botaoExcluir") {
         event.target.closest(".turma").remove()
         hidden
     }

     if (event.target.className === "editar") {        
        const pNumeroTurma = event.target.closest(".turma").querySelector(".numeroTurma")        
        let numeroTurma = +pNumeroTurma.textContent.split(":")[1]        

        let turma = buscaTurma(numeroTurma)        
        showModal(editarTurma, turma)
     }
})

function buscaTurma(numeroTurma) {
    for (let turma of turmas) {        
        if (turma.numeroTurma === numeroTurma) {
            return turma
        }
    }
}
 

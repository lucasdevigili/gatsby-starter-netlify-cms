import { Aluno } from "./Aluno.js"
import { Turma } from "./Turma.js"

//Criando a função para o botão
document.querySelector(".botao1").addEventListener("click", () => showModal(salvarAluno))

//Criando função para o Pop-up desaparecer
document.querySelector("#botaoDesaparecer").addEventListener("click", () => {    
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
})


let turmas = JSON.parse(localStorage.getItem("turmas")) || []


/**
 * Retorna um array com os alunos da turma 
 * @returns {Array<Aluno>} Um vetor com os alunos da turma selecionada
 */
function obtemAlunosTurma() {    
    let numeroTurma = +new URLSearchParams(location.search).get("numeroTurma")
    console.log(numeroTurma)
    for (let turma of turmas) {
        console.log(turma.numeroTurma)
        console.log(turma.alunos)
        if (turma.numeroTurma === numeroTurma) return turma.alunos
    }
    
}


function showModal(callback, aluno) {
    document.querySelector("#id01").hidden = false
    document.querySelector(".modal").style.cssText = "display: flex; justify-content:center; align-items: center;"        
    document.querySelector(".btnSalvar").onclick = callback

    if (aluno) {
        document.querySelector(".matricula").value = aluno.matricula
        document.querySelector(".nomeAluno").value = aluno.nomeAluno
        document.querySelector(".email").value = aluno.email
        document.querySelector(".telefone").value = aluno.telefone
        document.querySelector(".nota1").value = aluno.nota1
        document.querySelector(".nota2").value = aluno.nota2
        document.querySelector(".nota3").value = aluno.nota3
        document.querySelector(".btnSalvar").onclick = () => callback(aluno)
    } else {
        document.querySelector(".btnSalvar").onclick = callback
    }
}


function salvarAluno() {
    

    // Obtendo os valores do input
    let matricula = +document.querySelector(".matricula").value;
    let nomeAluno = document.querySelector(".nomeAluno").value;
    let email = document.querySelector(".email").value;
    let telefone = +document.querySelector(".telefone").value;
    let nota1 = +document.querySelector(".nota1").value;
    let nota2 = +document.querySelector(".nota2").value;
    let nota3 = +document.querySelector(".nota3").value;
    let media = (nota1 + nota2 + nota3) / 3
    let aluno = new Aluno(matricula, nomeAluno, email, telefone, nota1, nota2, nota3, media)

    if(!document.querySelector(".email").validity.valid) {
        const erro = document.querySelector(".erro")
        erro.textContent = "Por favor digite um email válido"
        return
    }

    document.querySelector("#botaoDesaparecer")
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
    
    let alunos = obtemAlunosTurma()
    alunos.push(aluno)
    console.log(turmas)
    localStorage.setItem("turmas", JSON.stringify(turmas))
    
    adicionarAluno(aluno)
    document.querySelector("#form").reset()
}

/**
 * @todo Implemetar essa função
 */
function editarAluno(aluno) {
    console.log(aluno)
    aluno.matricula = +document.querySelector(".matricula").value;
    aluno.nomeAluno = document.querySelector(".nomeAluno").value;
    aluno.email = document.querySelector(".email").value
    aluno.telefone = document.querySelector(".telefone").value;
    aluno.nota1 = document.querySelector(".nota1").value;
    aluno.nota2 = document.querySelector(".nota2").value;
    aluno.nota3 = document.querySelector(".nota3").value;



    localStorage.setItem("turmas", JSON.stringify(turmas))

    document.querySelector("#form").reset()
    carregaAlunos()

    document.querySelector("#botaoDesaparecer")
    document.querySelector("#id01").hidden = true 
    document.querySelector(".modal").style.cssText = ""
}

// matricula = document.querySelector("matricula")




// Função para adicionar um aluno
function adicionarAluno(aluno) {
    const divAluno = document.createElement("div")
    divAluno.className = "aluno"
    divAluno.insertAdjacentHTML("afterbegin", `<button class = "botaoExcluir">x</button><p class = matricula>Matrícula: ${aluno.matricula}</p><p>Nome: ${aluno.nomeAluno}</p><p>E-mail: ${aluno.email}</p><p>Telefone: ${aluno.telefone}</p><p>Nota 1: ${aluno.nota1}</p><p>Nota 2: ${aluno.nota2}</p><p>Nota 3: ${aluno.nota3}</p><p>Média: ${aluno.media.toFixed(2)}</p><button class = "editar">Editar</button>`)    
    document.querySelector("#alunos").append(divAluno)  
}

function carregaAlunos() {
    const divAlunos = document.querySelector("#alunos")
    
    let alunos = obtemAlunosTurma()
    console.log(alunos)

    if (divAlunos.innerHTML) {
        divAlunos.innerHTML = ""
        for (let aluno of alunos) {            
                adicionarAluno(aluno)            
        }        
    } else {                
        for (let aluno of alunos) {
            adicionarAluno(aluno)
        }                
    } 
    
}

window.addEventListener("load", () => {  
    carregaAlunos()
})

document.querySelector("#alunos").addEventListener("click", event => {
     if (event.target.className === "botaoExcluir") {
         event.target.closest(".aluno").remove()

     }

     if (event.target.className === "editar") {        
        const pMatricula = event.target.closest(".aluno").querySelector(".matricula")        
        let matricula = +pMatricula.textContent.split(": ")[1]        
        console.log(matricula)

        let aluno = buscaAluno(matricula) 
        console.log(aluno)       
        showModal(editarAluno, aluno)
     }
})

function buscaAluno(matricula) {
    let alunos = obtemAlunosTurma()
    console.log(alunos)
    for (let aluno of alunos) {
        if (aluno.matricula === matricula) {
            return aluno
        }
    }
}
// Calculo para Anos

const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
outputIdade.innerHTML = anoAtual - 1993; 

const dataAtual2 = new Date();
const anoAtual2 = dataAtual2.getFullYear();
outputTime.innerHTML = anoAtual - 2022; 

// teste de excel


function pegarValor() {
         
    let valor1 = document.getElementById("meuInput1").value;
    let valor2 = document.getElementById("meuInput2").value;
    let valor3 = document.getElementById("meuInput3").value;
    let valor4 = document.getElementById("meuInput4").value;
    console.log(valor1); 
    console.log(valor2); 
    console.log(valor3); 
    console.log(valor4); 
    
    let total = 0
    
    if(valor1 === "a"){
       total = total + 1
    }
    
    if(valor2 === "a"){
       total = total + 1
    }
    
    if(valor3 === "a"){
       total = total + 1
    }
    
    if(valor4 === "a"){
       total = total + 1
    }

    console.log(total)

    document.getElementById("meuOutput").value = total;
 }
 
 
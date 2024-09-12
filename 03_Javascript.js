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
    
    if(valor1 === "b"){
       total = total + 1
    }else{valor1 === "Escolha apenas uma alternativa"}{
        total = total + 0
    }
    
    if(valor2 === "b"){
       total = total + 1
    }else{valor1 === "Escolha apenas uma alternativa"}{
        total = total + 0
    }
    
    if(valor3 === "b"){
       total = total + 1
    }else{valor1 === "Escolha apenas uma alternativa"}{
        total = total + 0
    }
    
    if(valor4 === "b"){
       total = total + 1
    }else{valor1 === "Escolha apenas uma alternativa"}{
        total = total + 0
    }

    console.log(total)

   
    document.getElementById("meuOutput").value =  total;
 }
 



// https://www.canva.com/design/DAGDO1AYqMk/caOo9sz8mz-GCZPRtiOZgg/edit?utm_content=DAGDO1AYqMk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
//
// Fazer um css decente pro autocomplete (Tá paia pq não consigo colocar background)
// Css do solodog de os campos serem alternados por um normal e outro com o bg cinza!!
//


// Barra de Pesquisa
const inp = document.getElementById("searchInput");
const results = document.getElementById('res');

// evento quando clica na barra de pesquisa (POGGERS!)
inp.addEventListener("focusin", () => {
  /*
  fetch(`/api/dogs`)
  .then((response) => {
    return response.json();
  })
  .then((dogs) => {

  })
  */

  results.style.display = "inline";
  results.style.marginTop = "3px";
  results.style.backgroundColor = "red";
  
});

// Script que desativa os pre set de pesquisa quando clicka fora da barra de pesquisa (POGGERS!!!)

inp.addEventListener("focusout", (event) => {
  setTimeout( () => {
      document.getElementById("res").style.display = "none";
      inp.value = "";
  } , 150)
});

inp.addEventListener("input", (e) => {
  // Evento quando digita no search bar

  // value é oq ta sendo digitado
  let val = e.target.value;

  // Script pra primeira letra digitar ser maiscula, mesmo após o espaço (POGGERS!!!)
  let element = e.target;
  var words = element.value.split(' ');
  element.value = words.map(w => w.slice(0,1).toUpperCase() + w.slice(1)).join(' ');

  fetch(`/api/dogs/six/${val}`)
  .then((response) => {
    return response.json();
  })
  .then((dogs) => {
    results.innerHTML = '';
    dogs.forEach(dog => {
      const li = document.createElement('li');
      
      li.onclick = () => {
        console.log('A')
        displayDogInfo(dog);
      };

      li.addEventListener("mouseover" , () => {
        li.style.cursor = "pointer";
      })

      li.textContent = dog.nome;
      results.appendChild(li);
        
    })
    
  });

  /*
  results.style.color = "black";
  results.style.backgroundColor = "white";
  results.style.overflow = "auto";
  */
  
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("nome");
  //const searchTerm = document.getElementById("searchInput").value;

  if (searchTerm) {
    fetch(`/api/dogs/${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cão não encontrado");
        }
        return response.json();
      })
      .then((dog) => {
        displayDogInfo(dog);
      })
      .catch((error) => {
        displayError(error.message);
      });
  }
});

function displayDogInfo(dog) {
  document.getElementById("dogphoto").src = dog.image;
  document.getElementById("dogphoto").alt = dog.nome;
  document.getElementById("nome").innerText = dog.nome;
  document.getElementById("tamanho").innerText = dog.tamanho;
  document.getElementById("peso").innerText = dog.peso;
  document.getElementById("corPelagem").innerText = dog.corPelagem;
  document.getElementById("tipoPelagem").innerText = dog.tipoPelagem;
  document.getElementById("expectativa").innerText = dog.expectativaVida;
  document.getElementById("energia").innerText = dog.nivelEnergia;
  document.getElementById("temperamento").innerText = dog.temperamento;
  document.getElementById("treinamento").innerText = dog.facilidadeTreinamento;
  document.getElementById("doencas").innerText = dog.propensaoDoencasGeneticas;
  document.getElementById("cuidadoPelagens").innerText = dog.necessidadesCuidadosPelagem;
  document.getElementById("exercicios").innerText = dog.necessidadesExercicio;
  document.getElementById("requisitoEspaco").innerText = dog.requisitosEspaco;
  document.getElementById("socializacao").innerText = dog.nivelSocializacao;
  document.getElementById("protecao").innerText = dog.nivelProtecao;
  document.getElementById("latido").innerText = dog.nivelLatido;
  document.getElementById("compra").innerText = dog.precoMedioCompra;
  document.getElementById("medico").innerText = dog.custosVeterinariosMensais;
  document.getElementById("alimentacao").innerText = dog.custosAlimentacaoMensais;
  document.getElementById("descricao").innerText = dog.descricao;
}

function displayError(message) {
  window.alert("cão não encontrado");
}

document.getElementById("searchCompara").addEventListener("submit", function (event) {
    event.preventDefault();

    //const searchDog = document.getElementById('nome').value;
    const searchDog = new URLSearchParams(window.location.search).get("nome");
    const searchCompara = document.getElementById("compara").value;

    window.location.href =
      window.location.href = `/compara?dog=${searchDog}&compara=${searchCompara}`;
  });


//
// Area de codigo teste 
//

/*
document.getElementById('searchForm').addEventListener('submit', function(event) {
  const searchTerm = document.getElementById('searchInput').value;
  if (!searchTerm) {
    event.preventDefault();
    return;
  }
  this.action = `api/dogs/${searchTerm}`;
});
*/

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('dog');
    const searchDog = params.get('compara')
  
    if (searchTerm) {
      fetch(`/api/dogs/${searchTerm}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Cão não encontrado');
          }
          return response.json();
        })
        .then(dog => {
          displayDogInfo(dog);
        })
        .catch(error => {
          displayError(error.message);
        });
    }

    if (searchDog) {
        fetch(`/api/dogs/${searchDog}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Cão não encontrado');
            }
            return response.json();
          })
          .then(dog2 => {
            displayDogComparaInfo(dog2);
          })
          .catch(error => {
            displayError(error.message);
          });
      }
  });

// Barra de Pesquisa e auto complete variaveis
const inp = document.getElementById("searchInput");
const comp = document.getElementById("compara");
const results = document.getElementById('res');

// Evento quando digita no search bar
inp.addEventListener("input", (e) => {

  // val é oq ta sendo digitado; num é pra limitar a quantidade de resultados
  let val = e.target.value;
  let num = 0;

  // Mostrar o auto complete
  results.style.display = "inline";

  // Quando clica fora da barra de pesquisa
  inp.addEventListener("focusout", () => {
    setTimeout( () => {
      document.getElementById("res").style.display = "none";
      inp.value = "";
      val = "";
    } , 150)
  });

  // Script pra primeira letra digitar ser maiscula, mesmo após o espaço
  let element = e.target;
  var words = element.value.split(' ');
  element.value = words.map(w => w.slice(0,1).toUpperCase() + w.slice(1)).join(' ');

  // Acessar db
  fetch(`/api/dogs/six/${val}`)
  .then((response) => {
    return response.json();
  })
  .then((dogs) => {
    results.innerHTML = '';
    dogs.forEach(dog => {
      if(num === 6) return;
      const li = document.createElement('li');
      //li.style.backgroundColor = rgba(255, 255, 255, 0.95);

      li.onclick = () => {
        displayDogInfo(dog);
      };

      li.textContent = dog.nome;
      results.appendChild(li);
      li.id = 'resLi';
      num++

    })

    num = 0;
    // Caso nao tenha resultados
    if (dogs.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Nenhum resultado encontrado';
      results.appendChild(li)
      li.id = 'nn';
    }

  }); // then((dogs)
}); //Event-Input

comp.addEventListener("input", (e) => {
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
    const searchDog = new URLSearchParams(window.location.search).get("nome");
    const searchCompara = comp.value;

    dogs.forEach(dog => {
      const li = document.createElement('li');

      li.onclick = () => {
        console.log('A')
          window.location.href = `/compara?dog=${searchDog}&compara=${searchCompara}`;;
      };

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


// Função para exibir as informações do cão  
  function displayDogInfo(dog) {
    document.getElementById("dogphoto").src = dog.image;
    document.getElementById("dogphoto").alt = dog.nome;
    document.getElementById('nome').innerText = dog.nome;
    document.getElementById('tamanho').innerText = dog.tamanho;
    document.getElementById('peso').innerText = dog.peso;
    document.getElementById('corPelagem').innerText = dog.corPelagem;
    document.getElementById('tipoPelagem').innerText = dog.tipoPelagem;
    document.getElementById('expectativa').innerText = dog.expectativaVida;
    document.getElementById('energia').innerText = dog.nivelEnergia;
    document.getElementById('temperamento').innerText = dog.temperamento;
    document.getElementById('treinamento').innerText = dog.facilidadeTreinamento;
    document.getElementById('doencas').innerText = dog.propensaoDoencasGeneticas;
    document.getElementById('cuidadoPelagens').innerText = dog.necessidadesCuidadosPelagem;
    document.getElementById('exercicios').innerText = dog.necessidadesExercicio;
    document.getElementById('requisitoEspaco').innerText = dog.requisitosEspaco;
    document.getElementById('socializacao').innerText = dog.nivelSocializacao;
    document.getElementById('protecao').innerText = dog.nivelProtecao;
    document.getElementById('latido').innerText = dog.nivelLatido;
    document.getElementById('compra').innerText = dog.precoMedioCompra;
    document.getElementById('medico').innerText = dog.custosVeterinariosMensais;
    document.getElementById('alimentacao').innerText = dog.custosAlimentacaoMensais;
  }

  function displayDogComparaInfo(dog2) {
    document.getElementById("dogphoto-2").src = dog2.image;
    document.getElementById("dogphoto-2").alt = dog2.nome;
    document.getElementById('nome-2').innerText = dog2.nome;
    document.getElementById('tamanho-2').innerText = dog2.tamanho;
    document.getElementById('peso-2').innerText = dog2.peso;
    document.getElementById('corPelagem-2').innerText = dog2.corPelagem;
    document.getElementById('tipoPelagem-2').innerText = dog2.tipoPelagem;
    document.getElementById('expectativa-2').innerText = dog2.expectativaVida;
    document.getElementById('energia-2').innerText = dog2.nivelEnergia;
    document.getElementById('temperamento-2').innerText = dog2.temperamento;
    document.getElementById('treinamento-2').innerText = dog2.facilidadeTreinamento;
    document.getElementById('doencas-2').innerText = dog2.propensaoDoencasGeneticas;
    document.getElementById('cuidadoPelagens-2').innerText = dog2.necessidadesCuidadosPelagem;
    document.getElementById('exercicios-2').innerText = dog2.necessidadesExercicio;
    document.getElementById('requisitoEspaco-2').innerText = dog2.requisitosEspaco;
    document.getElementById('socializacao-2').innerText = dog2.nivelSocializacao;
    document.getElementById('protecao-2').innerText = dog2.nivelProtecao;
    document.getElementById('latido-2').innerText = dog2.nivelLatido;
    document.getElementById('compra-2').innerText = dog2.precoMedioCompra;
    document.getElementById('medico-2').innerText = dog2.custosVeterinariosMensais;
    document.getElementById('alimentacao-2').innerText = dog2.custosAlimentacaoMensais;
  }
  
  function displayError(message) {
    window.alert("cão não encontrado")
  }
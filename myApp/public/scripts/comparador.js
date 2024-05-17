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
  
  function displayDogInfo(dog) {
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
// document.getElementById('searchForm').addEventListener('submit', function(event) {
//   const searchTerm = document.getElementById('searchInput').value;
//   if (!searchTerm) {
//     event.preventDefault();
//     return;
//   }
//   this.action = `api/dogs/${searchTerm}`;
// });



document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get('nome');

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
  document.getElementById('descricao').innerText = dog.descricao;
}

function displayError(message) {
  window.alert("cão não encontrado")
}
 
    

    document.getElementById('searchCompara').addEventListener('submit', function (event) {

    event.preventDefault();

    //const searchDog = document.getElementById('nome').value;
    const searchDog = new URLSearchParams(window.location.search).get('nome');
    const searchCompara = document.getElementById('compara').value;
    
   window.location.href = window.location.href = `/compara?dog=${searchDog}&compara=${searchCompara}`;
  

  });





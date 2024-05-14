async function searchDog(searchTerm) {
  try {
    const response = await fetch(`/search?term=${searchTerm}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar cachorro: ' + response.statusText);
    }
    const data = await response.json();
    // Aqui você pode usar os dados recebidos para atualizar a página
    console.log(data);
  } catch (error) {
    console.error('Erro ao buscar cachorro:', error);
  }
}



// document.getElementById('tamanho').innerText = data.tamanho;
// document.getElementById('peso').innerText = data.peso;
// document.getElementById('corPelagem').innerText = data.corPelagem;
// document.getElementById('tipoPelagem').innerText = data.tipoPelagem;
// document.getElementById('expectativa').innerText = data.expectativaVida;
// document.getElementById('energia').innerText = data.nivelEnergia;
// document.getElementById('temperamento').innerText = data.temperamento;
// document.getElementById('treinamento').innerText = data.facilidadeTreinamento;
// document.getElementById('doencas').innerText = data.propensaoDoencasGeneticas;
// document.getElementById('cuidadoPelagens').innerText = data.necessidadesCuidadosPelagem;
// document.getElementById('exercicios').innerText = data.necessidadesExercicio;
// document.getElementById('requisitoEspaco').innerText = data.requisitosEspaco;
// document.getElementById('socializacao').innerText = data.nivelSocializacao;
// document.getElementById('protecao').innerText = data.nivelProtecao;
// document.getElementById('latido').innerText = data.nivelLatido;
// document.getElementById('compra').innerText = data.precoMedioCompra;
// document.getElementById('medico').innerText = data.custosVeterinariosMensais;
// document.getElementById('alimentacao').innerText = data.custosAlimentacaoMensais;
// document.getElementById('descricao').innerText = data.descricao;
const db = require('./firebase.js'); // Importa o Firestore

const dogsCollection = db.collection('dogs');

// Adicionar informações dos cachorros
const cachorroData = {
    nome: 'Galgo',
    tamanho: 'Grande',
    peso: '25-40',
    corPelagem: 'Varia',
    tipoPelagem: 'Curta',
    expectativaVida: '10-14',
    nivelEnergia: 'Médio',
    temperamento: 'Gentil, Afetuoso, Inteligente',
    necessidadesExercicio: 'Altas',
    facilidadeTreinamento: 'Média',
    nivelSocializacao: 'Alto',
    nivelLatido: 'Baixo',
    propensaoDoencasGeneticas: 'Nenhuma informação disponível',
    necessidadesCuidadosPelagem: 'Baixas',
    requisitosEspaco: 'Adequado para Apartamentos',
    nivelProtecao: 'Baixo',
    precoMedioCompra: '500 - 2.000',
    custosVeterinariosMensais: '50 - 100',
    custosAlimentacaoMensais: '50 - 100',
    descricao: 'O Galgo é uma raça de cachorro elegante e atlética, conhecida por sua velocidade e agilidade. Eles têm uma pelagem curta que requer cuidados mínimos. Galgos são cães gentis e afetuosos, geralmente bons com crianças e outros animais de estimação.'
  };



// Adicionar os dados do Chihuahua à coleção "dogs"
dogsCollection.doc('Galgo').set(cachorroData)
  .then(() => {
    console.log('Informações adicionadas ao banco de dados com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao adicionar informações ao banco de dados:', error);
  });

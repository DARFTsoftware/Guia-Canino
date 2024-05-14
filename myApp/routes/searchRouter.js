const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const serviceAccount = require('../keys/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

router.get('/', async (req, res) => {
  const { breed } = req.query;

  try {
    const snapshot = await db.collection('dogs').where('name', '==', breed).get();

    if (snapshot.empty) {
      res.status(404).send('Raça não encontrada');
      return;
    }

    const breedData = snapshot.docs[0].data();
    res.json(breedData);
  } catch (error) {
    console.error('Erro ao buscar raça:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;




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
const admin = require('firebase-admin');
//const MongoClient = require('mongodb').MongoClient;
// Path para o arquivo JSON com a chave privada gerada
const serviceAccount = require('./keys/serviceAccountKey.json');

// Inicializa o SDK Admin com a chave privada
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Obtém uma instância do Firestore
const db = admin.firestore();



module.exports = db;

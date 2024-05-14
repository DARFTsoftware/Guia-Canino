const express = require('express');
const app = express();
const path = require('path')
//const db = require('./firebase.js');

// app.js



// Restante do seu código aqui



// Adicionar informações dos cachorros


// Adicionar os dados do Chihuahua à coleção "dogs"


// Define a pasta onde estão os arquivos de visualização (views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Define o mecanismo de visualização como EJS

// main = __dirname + "/views/mainMenu.html"
// cadastro = __dirname + "/views/cadastro.html"
// compara = __dirname + "/views/compara.html"
// email = __dirname + "/views/e-mail.html"
// favoritos = __dirname + "/views/favoritos.html"
// login = __dirname + "/views/login.html"
// perfil = __dirname +  "/views/perfil.html"
// soloDog = __dirname + "/views/solodog.html"
// senha = __dirname + "/views/senha.html"



var cadastroRouter = require('./routes/cadastro');
var comparaRouter = require('./routes/compara');
var emailRouter = require('./routes/e-mail');
var favoitosRouter = require('./routes/favoritos');
var loginRouter = require('./routes/login');
var mainMenuRouter = require('./routes/mainMenu');
var perfilRouter = require('./routes/perfil');
var senhaRouter = require('./routes/senha');
var soloDogRouter = require('./routes/solodog');
var headerRouter = require('./routes/header');
var footerRouter = require('./routes/footer');
var testeRouter = require('./routes/teste');
var searchRouter = require('./routes/searchRouter');

app.use(express.static(path.join(__dirname, "public")))


app.use('/', mainMenuRouter);
app.use('/cadastro', cadastroRouter);
app.use('/compara', comparaRouter);
app.use('/email', emailRouter);
app.use('/favoritos', favoitosRouter);
app.use('/login', loginRouter);
app.use('/perfil', perfilRouter);
app.use('/senha', senhaRouter);
app.use('/solodog', soloDogRouter);
app.use('/header', headerRouter);
app.use('/footer', footerRouter); 
app.use('/teste', testeRouter);
app.use('/search', searchRouter);

app.get('/search', (req, res) => {
  const term = req.query.term; // Obtém o parâmetro 'term' da consulta

  // Consulta o Firestore para obter os dados do cachorro com o nome correspondente ao termo de pesquisa
  db.collection('dogs').doc(term).get()
    .then(doc => {
      if (!doc.exists) {
        res.status(404).send('Cachorro não encontrado');
      } else {
        const data = doc.data(); // Obtém os dados do cachorro
        res.json(data); // Retorna os dados como resposta JSON
      }
    })
    .catch(error => {
      console.error('Erro ao buscar cachorro:', error);
      res.status(500).send('Erro ao buscar cachorro');
    });
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});


module.exports = app;
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');

require("dotenv").config({ path: './keys/.env' });
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth.js");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // Define o mecanismo de visualização como EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var cadastroRouter = require("./routes/cadastro");
var comparaRouter = require("./routes/compara");
var compUltRouter = require("./routes/compUlt");
var emailRouter = require("./routes/e-mail");
var favoitosRouter = require("./routes/favoritos");
var loginRouter = require("./routes/login");
var mainMenuRouter = require("./routes/mainMenu");
var perfilRouter = require("./routes/perfil");
var senhaRouter = require("./routes/senha");
var soloDogRouter = require("./routes/solodog");
var headerRouter = require("./routes/header");
var footerRouter = require("./routes/footer");
var testeRouter = require("./routes/teste");
var searchRouter = require("./routes/searchRouter");
var carroRouter = require("./routes/carro");
var aboutRouter = require("./routes/about");
var firebaseRouter = require("./routes/firebaseRoute");

app.use(express.static(path.join(__dirname, "public")));



app.use("/", mainMenuRouter);
app.use("/cadastro", cadastroRouter);
app.use("/compara", comparaRouter);
app.use("/compult", compUltRouter);
app.use("/email", emailRouter);
app.use("/favoritos", favoitosRouter);
app.use("/login", loginRouter);
app.use("/perfil", perfilRouter);
app.use("/senha", senhaRouter);
app.use("/solodog", soloDogRouter);
app.use("/header", headerRouter);
app.use("/footer", footerRouter);
app.use("/teste", testeRouter);
app.use("/carro", carroRouter);
app.use("/about", aboutRouter);
app.use("/api", searchRouter);
app.use("/fireb", firebaseRouter);
app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

module.exports = app;

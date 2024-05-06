const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('cadastro')
})

module.exports = router;
var express = require('express');
var router = express.Router();
const{ body, validationResult } = require('express-validator');

const arrayValidation = [body('nombre')
.notEmpty().withMessage('Escribe un nombre').bail(),
body('edad')
.isInt().withMessage('Escribe una edad').bail(),
body('email')
.notEmpty().withMessage('Escribe un email').bail()
.isEmail().withMessage('No es un e-mail'),
body('color')
.notEmpty().withMessage('Escribe un email')
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', arrayValidation, function(req, res){
  const info = req.body;
  const errors = validationResult(req);
  if(errors.isEmpty()){
      res.send(`Hola ${info.nombre}, elegiste el color: ${info.color}, tu email es: ${info.email} y tu edad es: ${info.edad}`);
  }
  else{
  res.render('formulario', { errors: errors.mapped() });
  }
});

module.exports = router;

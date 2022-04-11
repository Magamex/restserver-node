const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', cargarArchivo);
router.put('/:coleccion/:id',[
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c, ['usuarios','productos'] )),
    validarCampos
],actualizarArchivo);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,obtenerCategorias,obtenerCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos } = require('../middlewares');


const router = Router();

//Obtener todas las categorias - publico
router.get('/',obtenerCategorias);

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//Crear categoria - privado
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar Categoria - privado
router.put('/:id',(req,res)=>{
    res.json('put')
})

//Borrar Categoria - Admin
router.delete('/:id',(req,res)=>{
    res.json('delete')
})

module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto,
        obtenerProductos,
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto} = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//Obtener todas las categorias - publico
router.get('/',obtenerProductos);

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

//Crear categoria - privado
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo Valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

//Actualizar Producto - privado
router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)

//Borrar Categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)

module.exports = router;
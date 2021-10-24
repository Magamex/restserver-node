const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

router.get('/',usuariosGet)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    // check('rol', 'No es un rol valido').isIn('USER_ROLE', 'ADMIN_ROLE'),
    check('rol').custom(esRoleValido),
    //Utilizo una funcion para validar los campos
    validarCampos
],usuariosPost)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut)

router.delete('/',usuariosDelete)

router.patch('/',usuariosPatch)

module.exports = router;
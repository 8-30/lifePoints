import { Router } from 'express';
import { autenticacionUsuario, AuthUsuario, deleteUsuario, disableUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controller/usuario.controller';


const router = Router();

router.get('/',    getUsuarios );
router.get('/:id', getUsuario );
router.get('/username/:username/password/:password', AuthUsuario );
router.post('/autenticacion', autenticacionUsuario );
router.post('/',    postUsuario );
router.put('/:id', putUsuario );
router.put('/disable/:id', disableUsuario );
router.delete('/:id', deleteUsuario );



export default router;
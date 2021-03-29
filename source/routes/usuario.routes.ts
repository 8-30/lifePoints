import { Router } from 'express';
import { AuthUsuario, deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controller/usuario.controller';


const router = Router();

router.get('/',    getUsuarios );
router.get('/:id', getUsuario );
router.get('/username/:username/password/:password', AuthUsuario );
router.post('/',    postUsuario );
router.put('/:id', putUsuario );
router.delete('/:id', deleteUsuario );



export default router;
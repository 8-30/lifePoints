import { Router } from 'express';
import { deleteusuario, getusuario, getusuarios, postusuario, putusuario } from '../controller/usuario.controller';


const router = Router();

router.get('/',    getusuarios );
router.get('/:id', getusuario );
router.post('/',    postusuario );
router.put('/:id', putusuario );
router.delete('/:id', deleteusuario );



export default router;
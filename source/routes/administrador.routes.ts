import { deleteAdministrador, getAdministrador, getAdministradores, postAdministrador, putAdministrador } from './../controller/administrador.controller';
import { Router } from 'express';


const router = Router();

router.get('/',    getAdministradores );
router.get('/:id', getAdministrador );
router.post('/',    postAdministrador );
router.put('/:id', putAdministrador );
router.delete('/:id', deleteAdministrador );



export default router;
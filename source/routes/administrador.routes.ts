import { autenticacionAdministrador, AuthAdmin, deleteAdministrador, getAdministrador, getAdministradores, postAdministrador, putAdministrador } from './../controller/administrador.controller';
import { Router } from 'express';


const router = Router();

router.get('/',    getAdministradores );
router.get('/:id', getAdministrador );
router.post('/',    postAdministrador );
router.post('/autenticacion',    autenticacionAdministrador);
router.put('/:id', putAdministrador );
router.delete('/:id', deleteAdministrador );
router.get('/username/:username/password/:password', AuthAdmin );



export default router;
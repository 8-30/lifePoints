import { deleteMensaje, getMensaje, getAllMensaje, postMensaje, putMensaje, getAllMensajeInbox } from '../controller/mensaje.controller';


import { Router } from 'express';


const router = Router();

router.get('/',    getAllMensaje );
router.get('/inbox/:id',    getAllMensajeInbox);
router.get('/:id', getMensaje );
router.post('/',    postMensaje );
router.put('/:id', putMensaje );
router.delete('/:id', deleteMensaje );



export default router;
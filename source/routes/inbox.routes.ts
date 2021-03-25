import { deleteInbox, getInbox, getAllInbox, postInbox, putInbox, getInboxPersona, getInboxParticipantes } from '../controller/inbox.controller';


import { Router } from 'express';


const router = Router();

router.get('/',    getAllInbox );
router.get('/:id', getInbox );
router.get('/persona/:id', getInboxPersona );   
router.get('/:id1/:id2', getInboxParticipantes);   
router.post('/',    postInbox );
router.put('/:id', putInbox );
router.delete('/:id', deleteInbox );



export default router;
import { deleteInbox, getInbox, getAllInbox, postInbox, putInbox, getInboxPersona } from '../controller/inbox.controller';


import { Router } from 'express';


const router = Router();

router.get('/',    getAllInbox );
router.get('/:id', getInbox );
router.get('/persona/:id', getInboxPersona );       
router.post('/',    postInbox );
router.put('/:id', putInbox );
router.delete('/:id', deleteInbox );



export default router;
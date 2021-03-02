import { Router } from 'express';
import { deletepersona, getpersona, getpersonas, postpersona, putpersona } from '../controller/persona.controller';


const router = Router();

router.get('/',    getpersonas );
router.get('/:id', getpersona );
router.post('/',    postpersona );
router.put('/:id', putpersona );
router.delete('/:id', deletepersona );



export default router;
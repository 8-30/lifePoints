import { Router } from 'express';
import { deleteorden, getorden, getordenes, postorden, putorden } from '../controller/orden.controller';


const router = Router();

router.get('/',    getordenes );
router.get('/:id', getorden );
router.post('/',    postorden );
router.put('/:id', putorden );
router.delete('/:id', deleteorden );



export default router;
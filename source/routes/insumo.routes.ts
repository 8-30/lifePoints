import { deleteInsumo, getInsumo, getInsumos, postInsumo, putInsumo } from './../controller/insumo.controller';


import { Router } from 'express';


const router = Router();

router.get('/',    getInsumos );
router.get('/:id', getInsumo );
router.post('/',    postInsumo );
router.put('/:id', putInsumo );
router.delete('/:id', deleteInsumo );



export default router;
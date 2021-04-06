import { getEmpleados,getEmpleado, postEmpleado, putEmpleado, deleteEmpleado, AuthEmpleado } from './../controller/empleado.controller';

import { Router } from 'express';


const router = Router();

router.get('/',    getEmpleados );
router.get('/:id', getEmpleado );
router.post('/',    postEmpleado );
router.put('/:id', putEmpleado );
router.delete('/:id', deleteEmpleado );
router.get('/username/:username/password/:password', AuthEmpleado );



export default router;
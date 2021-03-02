
import {Request, Response} from 'express'
import Empleado from '../models/empleado.models';

export const getEmpleados = async ( req: Request, res: Response ) =>{
    
    const empleado =await Empleado.findAll();
    res.json({
        empleado
    })
}

export const getEmpleado = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getEmpleado',
        id
    })
}

export const postEmpleado = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postEmpleado',
        body
    })
}

export const putEmpleado = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putUsuarios',
        id,
        body
    })
}

export const deleteEmpleado = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteUsuarios',
        id
    })
}
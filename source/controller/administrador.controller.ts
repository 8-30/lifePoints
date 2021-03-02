
import {Request, Response} from 'express'
import Administrador from '../models/administrador.model';

export const getAdministradores = async ( req: Request, res: Response ) =>{
    
    const administrador =await Administrador.findAll();
    res.json({
        administrador
    })
}

export const getAdministrador = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getAdministrador',
        id
    })
}

export const postAdministrador = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postUsuarios',
        body
    })
}

export const putAdministrador = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putUsuarios',
        id,
        body
    })
}

export const deleteAdministrador = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteUsuarios',
        id
    })
}
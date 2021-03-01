import {Request, Response} from 'express'
import Persona from '../models/usuario.model';

export const getUsuarios = async ( req: Request, res: Response ) =>{
    
    const usuarios =await Persona.findAll();
    res.json({
      usuarios
    })
}

export const getUsuario = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getUsuario',
        id
    })
}

export const postUsuario = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postUsuarios',
        body
    })
}

export const putUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putUsuarios',
        id,
        body
    })
}

export const deleteUsuario = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteUsuarios',
        id
    })
}
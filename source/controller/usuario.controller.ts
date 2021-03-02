import {Request, Response} from 'express'
import Usuario from '../models/usuario.model';

export const getusuarios = async ( req: Request, res: Response ) =>{
    
    const usuarios =await Usuario.findAll();
    res.json({
        msg:'usuarios',
        usuarios
    })
}

export const getusuario = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getusuario',
        id
    })
}

export const postusuario = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postusuarios',
        body
    })
}

export const putusuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putusuarios',
        id,
        body
    })
}

export const deleteusuario = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteusuarios',
        id
    })
}
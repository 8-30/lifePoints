import {Request, Response} from 'express'
import Orden from '../models/orden.model';

export const getordenes = async ( req: Request, res: Response ) =>{
    
    const ordens =await Orden.findAll();
    res.json({
        msg:'ordenes',
        ordens
    })
}

export const getorden = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getorden',
        id
    })
}

export const postorden = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postordens',
        body
    })
}

export const putorden = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putordens',
        id,
        body
    })
}

export const deleteorden = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteordens',
        id
    })
}
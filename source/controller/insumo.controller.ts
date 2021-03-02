
import {Request, Response} from 'express'
import Insumo from '../models/insumo.models';

export const getInsumos = async ( req: Request, res: Response ) =>{
    
    const insumo =await Insumo.findAll();
    res.json({
        insumo
    })
}

export const getInsumo = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getInsumo',
        id
    })
}

export const postInsumo = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postUsuarios',
        body
    })
}

export const putInsumo = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putUsuarios',
        id,
        body
    })
}

export const deleteInsumo = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deleteUsuarios',
        id
    })
}
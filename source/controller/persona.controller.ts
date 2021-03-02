import {Request, Response} from 'express'
import Persona from '../models/persona.model';

export const getpersonas = async ( req: Request, res: Response ) =>{
    
    const personas =await Persona.findAll();
    res.json({
      personas
    })
}

export const getpersona = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    res.json({
        msg:'getpersona',
        id
    })
}

export const postpersona = ( req: Request, res: Response ) =>{
    
    const { body } = req;

    res.json({
        msg:'postpersonas',
        body
    })
}

export const putpersona = ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg:'putpersonas',
        id,
        body
    })
}

export const deletepersona = ( req: Request, res: Response ) =>{
    
    const { id } = req.params;


    res.json({
        msg:'deletepersonas',
        id
    })
}
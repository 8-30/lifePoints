import {Request, Response} from 'express'
import Persona from '../models/persona.model';


export const getpersonas = async ( req: Request, res: Response ) =>{
    
    const personas =await Persona.findAll();
    res.json({
      msg: 'personas',
      personas
    })
}

export const getpersona = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const persona =await Persona.findByPk(id);
    if (persona){
        res.json(persona)
    }else{
        res.status(404).json({
            msg: `No existe una persona con el id ${id}`
        });
    }
    
}

export const postpersona = async( req: Request, res: Response ) =>{
    const { body } = req;
    try{
        const persona = new Persona(body);
        await persona.save();
        res.json(persona);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }

}

export const putpersona = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try{
        const persona = await Persona.findByPk(id);
        if(!persona){
            return res.status(404).json({
                msg:`No existe una persona con el id ${id}`
            })
        }
        await persona.update(body);
        res.json(persona);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}

export const deletepersona = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const { body } = req;
    try{
        const persona = await Persona.findByPk(id);
        if(!persona){
            return res.status(404).json({
                msg:`No existe una persona con el id ${id}`
            })
        }
        await persona.destroy(body);
        res.json(persona);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}
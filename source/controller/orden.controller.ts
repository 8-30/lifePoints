import {Request, Response} from 'express'
import Orden from '../models/orden.model';

export const getordenes = async ( req: Request, res: Response ) =>{
    
    const ordens =await Orden.findAll();
    res.json({
        msg:'ordenes',
        ordens
    })
}

export const getorden = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const orden =await Orden.findByPk(id);
    if (orden){
        res.json(orden)
    }else{
        res.status(404).json({
            msg: `No existe una orden con el id ${id}`
        });
    }
    
}

export const postorden = async( req: Request, res: Response ) =>{
    const { body } = req;
    try{
        const orden = new Orden(body);
        await orden.save();
        res.json(orden);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }

}

export const putorden = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try{
        const orden = await Orden.findByPk(id);
        if(!orden){
            return res.status(404).json({
                msg:`No existe una orden con el id ${id}`
            })
        }
        await orden.update(body);
        res.json(orden);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}

export const deleteorden = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const { body } = req;
    try{
        const orden = await Orden.findByPk(id);
        if(!orden){
            return res.status(404).json({
                msg:`No existe una orden con el id ${id}`
            })
        }
        await orden.destroy(body);
        res.json(orden);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}
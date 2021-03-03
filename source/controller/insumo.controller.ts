
import {Request, Response} from 'express'
import Insumo from '../models/insumo.models';

export const getInsumos = async ( req: Request, res: Response ) =>{
    
    const insumo =await Insumo.findAll();
    res.json({
        insumo
    })
}

export const getInsumo =async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const insumo = await Insumo.findByPk(id);
    if(insumo){
        res.json({
            insumo
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${id}`
        });
    }
}

export const postInsumo = async( req: Request, res: Response ) =>{
    
    const { body } = req;

    try {
        ///const administrador = Administrador.create(body);
        const insumo = new Insumo(body);
        insumo.save();
        res.json(insumo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const putInsumo = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    try {
        const insumo = Insumo.findByPk(id);
        if(!insumo){
           
            return res.status(404).json({
                msg: `no existe ningun insumo con el ide ${id}`,
            });
        }
        await insumo.then((value)=>value?.update(body));
        res.json(insumo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteInsumo = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const insumo =await Insumo.findByPk(id);
    if(insumo){
        res.json({
            insumo
        });
    }
    await insumo?.destroy();
    res.json(insumo);
}
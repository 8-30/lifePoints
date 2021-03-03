
import {Request, Response} from 'express'
import Administrador from '../models/administrador.model';

export const getAdministradores = async ( req: Request, res: Response ) =>{
    
    const administrador =await Administrador.findAll();
    res.json({
        administrador
    })
}

export const getAdministrador = async ( req: Request, res: Response ) =>{
    
    const {id}= req.params;
    const administrador = await Administrador.findByPk(id);
    if(administrador){
        res.json({
            administrador
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${id}`
        });
    }

}

export const postAdministrador = async ( req: Request, res: Response ) =>{
    
    const {body}= req;
    try {
        const administrador = new Administrador(body);
        administrador.save();
        res.json(administrador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const putAdministrador = async  ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        const admintrador =await Administrador.findByPk(id);
        if(!admintrador){
            return res.status(404).json({
                msg: `no existe ningun usuario con el id ${id}`,
            });
        }
        await admintrador.update(body);
        res.json(admintrador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteAdministrador = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const administrador =await Administrador.findByPk(id);
    if(administrador){
        res.json({
            administrador
        });
    }
    await administrador?.destroy();
    res.json(administrador);
}
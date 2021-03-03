import {Request, Response} from 'express'
import Usuario from '../models/usuario.model';

export const getusuarios = async ( req: Request, res: Response ) =>{
    
    const usuarios =await Usuario.findAll();
    res.json({
        msg:'usuarios',
        usuarios
    })
}

export const getusuario = async( req: Request, res: Response ) =>{
    const { id } = req.params;
    const usuario =await Usuario.findByPk(id);
    if (usuario){
        res.json(usuario)
    }else{
        res.status(404).json({
            msg: `No existe una usuario con el id ${id}`
        });
    }
    
}

export const postusuario = async( req: Request, res: Response ) =>{
    const { body } = req;
    try{
        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}

export const putusuario = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try{
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg:`No existe una usuario con el id ${id}`
            })
        }
        await usuario.update(body);
        res.json(usuario);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}

export const deleteusuario = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const { body } = req;
    try{
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg:`No existe una usuario con el id ${id}`
            })
        }
        await usuario.destroy(body);
        res.json(usuario);
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
}
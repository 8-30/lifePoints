
import {Request, Response} from 'express'
import Empleado from '../models/empleado.models';

export const getEmpleados = async ( req: Request, res: Response ) =>{
    
    const empleado =await Empleado.findAll();
    res.json({
        empleado
    })
}

export const getEmpleado = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if(empleado){
        res.json({
            empleado
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${id}`
        });
    }
}

export const postEmpleado = async ( req: Request, res: Response ) =>{
    
    const { body } = req;

    try {
        ///const administrador = Administrador.create(body);
        const empleado = new Empleado(body);
        empleado.save();
        res.json(empleado);
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const putEmpleado = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        const empleado = Empleado.findByPk(id);
        if(!empleado){
            return res.status(404).json({
                msg: `no existe ningun empleado con el ide ${id}`,
            });
        }
        await empleado.then((value)=>value?.update(body));
        res.json(empleado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteEmpleado = async( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const empleado =await Empleado.findByPk(id);
    if(empleado){
        res.json({
            empleado
        });
    }
    await empleado?.destroy();
    res.json(empleado);
}
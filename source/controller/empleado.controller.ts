
import {Request, Response} from 'express'
import Empleado from '../models/empleado.models';
import Persona from '../models/persona.model';

export const getEmpleados = async ( req: Request, res: Response ) =>{
    
    const empleados =await Empleado.findAll();
   
   //for para recorrer todos los empleados
    for(const empleado of empleados ){
        //llamamos a la funcion para vincular a los empleados con su informacion de personas
        await obtenerInformacionEmpleado(empleado);    
    };
    res.json({
        empleados
    })
}


export const getEmpleado = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if(empleado){
        await obtenerInformacionEmpleado(empleado)
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
        //para guardar peromero la persona
        const persona = new Persona(body);
        persona.save();
        
        empleado.save();
        res.json({
            empleado,
            persona
        });
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
        const empleado = await Empleado.findByPk(id);
        if(!empleado){
            return res.status(404).json({
                msg: `no existe ningun empleado con el id ${id}`,
            });
        }
        await empleado.update(body);
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
//funciones
async function obtenerInformacionEmpleado(empleado:Empleado){
    //buscamos a la persona que tenga el mismo id que el empleado
    const persona = await Persona.findOne({
        where: {
            idPersona : empleado.idEmpleado,
        }
    });
    //Se asigna la informacion de persona al empleado
    //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 empleado pero la wea no reconoce y sale error)
    if (persona){
        empleado.setDataValue("persona",persona)
    } 
}
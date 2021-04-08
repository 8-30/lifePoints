
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
        //para guardar peromero los datos de persona persona
        const persona =new Persona(body);
        await persona.save();
        // creamos empleado y asignamos el id de persona guardado anteriormente
        const empleado = new Empleado(body);
        empleado.setDataValue("idEmpleado", persona.idPersona)
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
         // buscamos a la persona con el mismo id de empleado y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.update(body);
        res.json({
            empleado,
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteEmpleado = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    try{
        const empleado =await Empleado.findByPk(id);
        if(!empleado){
            return res.status(404).json({
                msg:`No existe un empleado con el id ${id}`
            })
        }
        await empleado.destroy();
        // buscamos a la persona con el mismo id de empleado y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.destroy();
        res.json({
            empleado,
            persona
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
    
}
export const AuthEmpleado = async ( req: Request, res: Response ) =>{
    
    const { username,password } = req.params;
    const persona = await Persona.findOne({ where: { usuario: username } });
    console.log("mi password"+password);
    if(persona){
        const empleado = await Empleado.findOne({where:{idEmpleado:persona?.idPersona}});
        if(empleado){
            if(persona.contrasenia==password){
                res.json({
                    persona
                });
            }else{
                res.status(404).json({
                    msg:`Contraseña incorrecta del usuario ${username}`
                });    
            }
        }else{
            res.status(404).json({
                msg:`Esta persona: ${username} no es un usuario`
            });  
        }
 
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${username}`
        });
    }
}

export const disableEmpleado = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    try {
        var empleado = await Empleado.findByPk(id);
        if(!empleado){
            return res.status(404).json({
                msg: `no existe ningun empleado con el id ${id}`,
            });
        }
        empleado.setDataValue("enable",false);
        await empleado.update({enable:empleado.enable});
        res.json(true);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
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


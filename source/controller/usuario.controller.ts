
import {Request, Response} from 'express'
import Usuario from '../models/usuario.model';
import Persona from '../models/persona.model';
import { where } from 'sequelize/types';
import brypt from "bcrypt";

export const getUsuarios = async ( req: Request, res: Response ) =>{
    
    const usuarios =await Usuario.findAll();
   
   //for para recorrer todos los usuarios
    for(const usuario of usuarios ){
        //llamamos a la funcion para vincular a los usuarios con su informacion de personas
        await obtenerInformacionUsuario(usuario);    
    };
    res.json({
        usuarios
    })
}


export const getUsuario = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if(usuario){
        await obtenerInformacionUsuario(usuario)
        res.json({
            usuario
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${id}`
        });
    }
}
export const AuthUsuario = async ( req: Request, res: Response ) =>{
    
    const { username,password } = req.params;
    const persona = await Persona.findOne({ where: { usuario: username } });
    if(!persona) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }
    const passwordCorrect = (persona === null) ?  false : await brypt.compare(password,persona.contrasenia);

    if (!(persona && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }
    res.json({
        usuario:persona?.usuario,
        idPersona:persona?.idPersona,
    });
}
export const autenticacionUsuario = async ( req: Request, res: Response ) =>{
    const {body}=req;
    const { usuario,contrasenia } = body;
    const persona = await Persona.findOne({ where: { usuario: usuario } });
    if(!persona) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }
    const passwordCorrect = (persona === null) ?  false : await brypt.compare(contrasenia,persona.contrasenia);

    if (!(persona && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }
    res.json({
        usuario:persona?.usuario,
        idPersona:persona?.idPersona,
    });
}

export const postUsuario = async ( req: Request, res: Response ) =>{
    
    const { body } = req;
    try {
        ///const administrador = Administrador.create(body);
        //para guardar peromero los datos de persona persona
        const {contrasenia} = body;
        const saltRaunds = 10;
        const passwordHash =await brypt.hash(contrasenia,saltRaunds);
        const persona =new Persona(body);
        persona.contrasenia = passwordHash;
        await persona.save();
        // creamos usuario y asignamos el id de persona guardado anteriormente
        const usuario = new Usuario(body);
        usuario.setDataValue("idUsuario", persona.idPersona)
        usuario.save();
        res.json({
            usuario,
            persona
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const putUsuario = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: `no existe ningun usuario con el id ${id}`,
            });
        }
        await usuario.update(body);
         // buscamos a la persona con el mismo id de usuario y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.update(body);
        res.json(
            true
        );
    } catch (error) {
        res.json(false)
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}
export const disableUsuario = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    try {
        var usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: `no existe ningun usuario con el id ${id}`,
            });
        }
        usuario.setDataValue('enable',!usuario.enable);
        await usuario.update({enable:usuario.enable});
        res.json(
            usuario.enable
        );
    } catch (error) {
        res.json(false)
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteUsuario = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    try{
        const usuario =await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg:`No existe un usuario con el id ${id}`
            })
        }
        await usuario.destroy();
        // buscamos a la persona con el mismo id de usuario y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.destroy();
        res.json({
            usuario,
            persona
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
    
}

//funciones
async function obtenerInformacionUsuario(usuario:Usuario){
    //buscamos a la persona que tenga el mismo id que el usuario
    const persona = await Persona.findOne({
        where: {
            idPersona : usuario.idUsuario,
        }
    });
    //Se asigna la informacion de persona al usuario
    //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 usuario pero la wea no reconoce y sale error)
    if (persona){
        usuario.setDataValue("persona",persona)
    } 
}


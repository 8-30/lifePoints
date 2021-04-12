
import {Request, Response} from 'express'
import Administrador from '../models/administrador.model';
import Persona from '../models/persona.model';
import brypt from "bcrypt";

export const getAdministradores = async ( req: Request, res: Response ) =>{
    
    const administradores =await Administrador.findAll();
   
   //for para recorrer todos los administradors
    for(const administrador of administradores ){
        //llamamos a la funcion para vincular a los administradors con su informacion de personas
        await obtenerInformacionAdministrador(administrador);    
    };
    res.json({
        administradores
    })
}


export const getAdministrador = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;
    const administrador = await Administrador.findByPk(id);
    if(administrador){
        await obtenerInformacionAdministrador(administrador)
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
        // creamos administrador y asignamos el id de persona guardado anteriormente
        const administrador = new Administrador(body);
        administrador.setDataValue("idAdministrador", persona.idPersona)
        administrador.save();
        res.json({
            administrador,
            persona
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const autenticacionAdministrador = async ( req: Request, res: Response ) =>{
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
    res.send({
        usuario:persona?.usuario,
        idPersona:persona?.idPersona,
    });
}

export const putAdministrador = async ( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        const administrador = await Administrador.findByPk(id);
        if(!administrador){
            return res.status(404).json({
                msg: `no existe ningun administrador con el id ${id}`,
            });
        }
        await administrador.update(body);
         // buscamos a la persona con el mismo id de administrador y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.update(body);
        res.json({
            administrador,
            persona
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteAdministrador = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    try{
        const administrador =await Administrador.findByPk(id);
        if(!administrador){
            return res.status(404).json({
                msg:`No existe un administrador con el id ${id}`
            })
        }
        await administrador.destroy();
        // buscamos a la persona con el mismo id de administrador y la actualizamos
        const persona = await Persona.findByPk(id);
        await persona?.destroy();
        res.json({
            administrador,
            persona
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })

    }
    
}


export const AuthAdmin = async ( req: Request, res: Response ) =>{
    
    const { username,password } = req.params;
    const persona = await Persona.findOne({ where: { usuario: username } });
    console.log("mi password"+password);
    if(persona){
        const admin = await Administrador.findOne({where:{idAdministrador:persona?.idPersona}});
        if(admin){
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
                msg:`Esta persona: ${username} no es un admin`
            });  
        }
 
    }else{
        res.status(404).json({
            msg:`no existe ningun usuario con el ide ${username}`
        });
    }
}

//funciones
async function obtenerInformacionAdministrador(administrador:Administrador){
    //buscamos a la persona que tenga el mismo id que el administrador
    const persona = await Persona.findOne({
        where: {
            idPersona : administrador.idAdministrador,
        }
    });
    //Se asigna la informacion de persona al administrador
    //(se pone el if para que no salga error porque siempre va a existir 1 persona por 1 administrador pero la wea no reconoce y sale error)
    if (persona){
        administrador.setDataValue("persona",persona)
    } 
}
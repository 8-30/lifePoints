
import {Request, Response} from 'express'
import admin from "firebase-admin"
import Mensaje from '../models/mensaje.model';
import router from '../routes/administrador.routes';



export const getAllMensaje = async ( req: Request, res: Response ) =>{
    
    const mensajees =await Mensaje.findAll();
    res.json({
        mensajees
    })
}


export const getAllMensajeInbox = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    var mensaje =await Mensaje.findAll({
        where: { 
            idInbox: id 
        } 
    });

    if(mensaje){
        res.json({
            mensaje
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun mensaje del inbox con el id: ${id}`
        });
    }

}

export const getLastMensajeInbox = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    var mensajes =await Mensaje.findAll({
        where: { 
            idInbox: id 
        } 
    });
    var mensaje=mensajes[mensajes.length-1];

    if(mensaje){
        res.json({
            mensaje
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun mensaje del inbox con el id: ${id}`
        });
    }

}


export const getMensaje =async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const mensaje = await Mensaje.findByPk(id);
    if(mensaje){
        res.json({
            mensaje
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun mensaje con el id ${id}`
        });
    }
}

export const postMensaje = async( req: Request, res: Response ) =>{
    
    const { body } = req;

    try {
        const mensaje = new Mensaje(body);
        mensaje.save();
        res.json(mensaje);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const putMensaje = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    try {
        const mensaje = await Mensaje.findByPk(id);
        if(!mensaje){
            return res.status(404).json({
                msg: `no existe ningun mensaje con el id ${id}`,
            });
        }
        await mensaje.update(body);
        res.json(mensaje);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteMensaje = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const mensaje =await Mensaje.findByPk(id);
    if(mensaje){
        res.json({
            mensaje
        });
    }
    await mensaje?.destroy();
    res.json(mensaje);
}
export const notify = async ( req: Request, res: Response ) =>{
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'fb0aBpdpTC2hUX9qC3V5H7:APA91bFUi8xgBA-EWfIe1c9BSBQz-op42pD0AKQDp5sA84HKLjPfJ8Ma66YkPsDuhzI08UkMSH6qX0SIrmnTpT2To4DEa9zKV2tAAtb_olBfqdSXVoc7oGOf0i_cHTPUwumhzpNKxd40';

    var message = {
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
      });


}
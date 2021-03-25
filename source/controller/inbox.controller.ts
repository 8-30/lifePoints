
import {Request, Response} from 'express'
import { Sequelize } from 'sequelize-typescript';
import Inbox from '../models/inbox.model';


export const getAllInbox = async ( req: Request, res: Response ) =>{
    
    const inboxes =await Inbox.findAll();
    res.json({
        inboxes
    })
}

export const getInbox =async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const inbox = await Inbox.findByPk(id);
    if(inbox){
        res.json({
            inbox
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun inbox con el id ${id}`
        });
    }
}

export const getInboxPersona =async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    var inbox =await Inbox.findAll({
        where: Sequelize.or(
            { persona1: id },
            { persona2: id }
          )
    });

    if(inbox){
        res.json({
            inbox
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun inbox de la persona con el id: ${id}`
        });
    }
}

export const getInboxParticipantes =async ( req: Request, res: Response ) =>{
    
    const { id1} = req.params;
    const { id2} = req.params;

    var inbox =await Inbox.findAll({
        where: Sequelize.or(
            { persona1: id1,
            persona2:id2 },
            { persona1: id2,
            persona2: id1, }
          )
    });

    if(inbox){
        res.json({
            inbox
        });
    }else{
        res.status(404).json({
            msg:`no existe ningun inbox de la persona con el id: ${id1}`
        });
    }
}

export const postInbox = async( req: Request, res: Response ) =>{
    
    const { body } = req;
            try {
                const inbox = new Inbox(body);
                var inboxExistente =await Inbox.findAll({
                    where: Sequelize.or(
                        { persona1: inbox.persona1,
                        persona2:inbox.persona2 },
                        { persona1: inbox.persona2,
                        persona2:inbox.persona1 }
                      )
                });
                if(inboxExistente.length==0){
                    inbox.save();
                    res.json(inbox);
                }else{
                        res.status(500).json({
                            msg:'Ya existe ese inbox',  
                        });
                    }
                

            } catch (error) {
                console.log(error);
                res.status(500).json({
                    msg:'Hable con el administrador',
                });
            }
        
        
    

    /*try {
        const inbox = new Inbox(body);
        inbox.save();
        res.json(inbox);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }*/
}

export const putInbox = async( req: Request, res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    try {
        const inbox = await Inbox.findByPk(id);
        if(!inbox){
            return res.status(404).json({
                msg: `no existe ningun inbox con el id ${id}`,
            });
        }
        await inbox.update(body);
        res.json(inbox);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
}

export const deleteInbox = async ( req: Request, res: Response ) =>{
    
    const { id } = req.params;

    const inbox =await Inbox.findByPk(id);
    if(inbox){
        res.json({
            inbox
        });
    }
    await inbox?.destroy();
    res.json(inbox);
}
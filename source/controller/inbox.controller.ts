
import {Request, Response} from 'express'
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

export const postInbox = async( req: Request, res: Response ) =>{
    
    const { body } = req;

    try {
        const inbox = new Inbox(body);
        inbox.save();
        res.json(inbox);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        });
    }
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
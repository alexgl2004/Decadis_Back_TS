import { Request, Response } from "express"

export function getIndex(request: Request, response: Response){
    response.send({msg:'Decadis Main page'});
}
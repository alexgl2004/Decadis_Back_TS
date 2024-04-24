import { Request, Response } from "express"

export function resetDatabase(request: Request, response: Response){
    response.send('{False}');
}
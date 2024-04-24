import { Request, Response } from "express"
import  { db } from '../db'

export function getActions(request: Request, response: Response){}
export function getUserAction(request: Request, response: Response){}

/*
export function getActions(request: Request, response: Response){

    try {

        db.query(
          'SELECT * FROM actions ORDER BY id ASC', 
          (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          }
      )
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get Actions)');
    }

}

export function getUserAction(request: Request, response: Response){

    try {

        db.query(
          "SELECT * FROM actions WHERE id IN (SELECT action_id as id FROM actions_user WHERE user_id = $1)",
          [
            request.params.id
          ], 
          (error, results) => {
          if (error) {
            throw error
          }
            response.status(200).json(results.rows)
          }
      )
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get Actions of User)');
    }
    
}
*/
import { Request, Response } from "express"
import  { db } from '../db'

export function getItemsPositions(request: Request, response: Response){

    try {

        db.query(
          'SELECT * FROM positions ORDER BY id ASC', 
          (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          }
      )
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get USERs)');
    }

}

export function deleteItem(request: Request, response: Response){

    try {

        db.query(
          "SELECT id FROM actions_user WHERE action_id = 2 AND user_id = $1",
          [
            request.body.user_id
          ], 
          (error, results) => {
            
            if (error) {
              throw error
            }

            if(results.rows[0]){
    
              db.query('DELETE FROM items WHERE id = $1 OR name = $2', 
              [
                request.params.id,
                request.body.byName
              ], (error, results) => {
                if (error) {
                  throw error
                }
                response.status(201).json({id:parseInt(request.params.id)})
              })
            }else{
                response.status(200).json({'error':'NO access!'})
            }
      
          }
        )
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (delete USER)');
    }
    
}

export function moveItem(request: Request, response: Response){

    try {

        db.query(
          "SELECT id FROM actions_user WHERE action_id = 2 AND user_id = $1",
          [
            request.body.user_id
          ], 
          (error, results) => {
            
            if (error) {
              throw error
            }
    
            if(results.rows[0]){
    
              db.query(
                'UPDATE items SET position_id = $1, last_changed_by_id=$3 WHERE id = $2',
                [
                  request.body.position_id, 
                  request.params.id,
                  request.body.user_id
                ],
                (error, results) => {
                  if (error) {
                    throw error
                  }
                  response.status(201).json({id:parseInt(request.params.id)})
                }
              )
            }else{
              response.status(200).json({'error':'NO access!'})
            }
      
          }
        )
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (update USER)');
    }
    
}

export function createItem(request: Request, response: Response){

    try {

        db.query(
          "SELECT id FROM actions_user WHERE action_id = 2 AND user_id = $1",
          [
            request.body.user_id
          ], 
          (error, results) => {
    
            if (error) {
              throw error
            }
    
            if(results.rows[0]){
                db.query(
                  'INSERT INTO items (name, text, user_id, last_changed_by_id) VALUES ($1, $2, $3, $3) RETURNING *', 
                  [
                    request.body.name,
                    request.body.text,
                    request.body.user_id
                  ],
                  (error, results) => {
                    if (error) {
                    throw error
                    }
                    response.status(201).json({id:results.rows[0].id})
                  }
              )
            }else{
              response.status(200).json({'error':'NO access!'})
            }
          }
        )
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (add USER)');
    }
    
}

export function getItem(request: Request, response: Response){

    try {

        db.query(
          "SELECT id FROM actions_user WHERE action_id = 2 AND user_id = $1",
          [
            request.body.user_id
          ], 
          (error, results) => {
    
            if (error) {
              throw error
            }
    
            if(results.rows[0]){
              db.query(
                "SELECT * FROM items WHERE id = $1",
                [
                  request.params.id
                ], 
                (error, results) => {
                if (error) {
                  throw error
                }
                  response.status(200).json(results.rows[0])
                }
              )
            }else{
              response.status(200).json({'error':'NO access!'})
            }
      
          }
        )
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get USER)');
    }
    
}

export function getItems(request: Request, response: Response){

    try {

        db.query(
            'SELECT * FROM items ORDER BY id ASC', 
            (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
            }
        )

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get USERs)');
    }
    
}

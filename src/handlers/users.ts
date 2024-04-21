import { Request, Response } from "express"
import  { db } from '../db'

export function getUsers(request: Request, response: Response){

try {

    db.query(
        "SELECT users.*, ac.action_ids FROM users LEFT JOIN (SELECT array_to_string(array_agg(action_id), ',') as action_ids, user_id FROM actions_user GROUP BY user_id) as ac ON users.id=ac.user_id",
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send({usersData:results.rows})
        }
    )

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get USERs)');
    }

}

export function getUser(request: Request, response: Response){

    try {

        db.query(
            "SELECT users.*, ac.action_ids FROM users, (SELECT array_to_string(array_agg(action_id), ',') as action_ids, user_id FROM actions_user WHERE user_id = $1 GROUP BY user_id) as ac WHERE id = $1",
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

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get USER)');
    }
    
}

export function createUser(request: Request, response: Response){

    try {
/*
        if(request.body.firstname ||
            request.body.lastname ||
            request.body.email){
*/
            db.query(
                'INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *', 
                [
                    request.body.firstname,
                    request.body.lastname,
                    request.body.email
                ],
                (error, results) => {

                    if (error) {
                        throw error
                    }
                    
                    console.log('generated user ID:' + results.rows[0].id)

                    let created_id: number = results.rows[0].id

                    if(request.body.action_ids && request.body.action_ids.length>0){   

                        const action_ids_lines = request.body.action_ids.map((elem: string)=>{
                        return '('+elem+','+created_id+')'
                        }).join(',')

                        db.query(
                            'INSERT INTO actions_user (action_id,user_id) VALUES ' + action_ids_lines,
                            (error, results) => {
                                if (error) {
                                throw error
                                }
                                response.status(201).json({id:created_id})
                            }
                        )
                    }else{
                        response.status(201).json({id:created_id})
                    }
                
                }
            )
/*            
        }else{
            response.status(406)
        }
*/
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (add USER)');
    }
    
}

export function updateUser(request: Request, response: Response){

//  console.log(req.body, req.params)

try {

    db.query(
      'UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE id = $4',
      [
        request.body.firstname, 
        request.body.lastname, 
        request.body.email,
        request.params.id
      ],
      (error, results) => {
        if (error) {
          throw error
        }
        db.query(
          'DELETE FROM actions_user WHERE user_id = $1',
          [
            request.params.id
          ],
          (error, results) => {
            if (error) {
              throw error
            }
            if(request.body.action_ids.length>0){
              const action_ids_lines = request.body.action_ids.map((elem:string)=>{
                return '('+elem+','+request.params.id+')'
              }).join(',')
              db.query(
                'INSERT INTO actions_user (action_id,user_id) VALUES ' + action_ids_lines,
                (error, results) => {
                  if (error) {
                    throw error
                  }
                  response.status(201).json({id:request.params.id})
                }
              )
            }else{
                response.status(201).json({id:request.params.id})
            }
          }
        )
      }
    )

  } catch (err) {
    console.error(err);
    response.status(500).send('Internal Server Error (update USER)');
  }

}

export function deteleUser(request: Request, response: Response){

    try {

        db.query('DELETE FROM items WHERE user_id = $1', 
        [
            request.params.id
        ], (error, results) => {
          if (error) {
            throw error
          }
          db.query('DELETE FROM users WHERE id = $1', 
          [
            request.params.id
          ], (error, results) => {
            if (error) {
              throw error
            }
            db.query('DELETE FROM actions_user WHERE user_id = $1', 
            [
               request.params.id
            ], (error, results) => {
              if (error) {
                throw error
              }
              response.status(201).json({id:request.params.id})
            })
          })
        })
    
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (delete USER)');
    }

}

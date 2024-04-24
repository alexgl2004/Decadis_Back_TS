import { Request, Response } from "express"
import  { db } from '../db'

export function resetDb(request: Request, response: Response){

    try {

        db.query('DROP TABLE IF EXISTS actions CASCADE',(error, results) => {
            if (error) {
                throw error
            }

            db.query('CREATE TABLE IF NOT EXISTS actions (id SERIAL PRIMARY KEY, name VARCHAR(30))',(error, results) => {
                if (error) {
                throw error
                }
                db.query("INSERT INTO actions (name) VALUES ('Move Item'),('View Item'),('Delete Item'),('Create Item')", (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            })
        })
        
        db.query('DROP TABLE IF EXISTS actions_user CASCADE',(error, results) => {
            if (error) {
                throw error
            }

            db.query('CREATE TABLE IF NOT EXISTS actions_user (id SERIAL PRIMARY KEY, user_id INTEGER, action_id INTEGER)', (error, results) => {
                if (error) {
                throw error
                }
                db.query('INSERT INTO actions_user (user_id, action_id) VALUES (1, 1),(1, 2),(1, 3),(1, 4),(2, 1),(2, 4)', (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            })
        })

        db.query('DROP TABLE IF EXISTS items CASCADE',(error, results) => {
            if (error) {
                throw error
            }

            db.query('CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, name VARCHAR(100), text VARCHAR(200), user_id INTEGER, position_id INTEGER, last_changed_by_id INTEGER)', (error, results) => {
                if (error) {
                throw error
                }
                db.query("INSERT INTO items (name, text, user_id, position_id, last_changed_by_id) VALUES ('Chairs','',1,1,1),('Tables','',2,1,2)", (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            })
        })
      
        db.query('DROP TABLE IF EXISTS positions CASCADE',(error, results) => {
            if (error) {
                throw error
            }
  
            db.query('CREATE TABLE IF NOT EXISTS positions (id SERIAL PRIMARY KEY, name VARCHAR(30))', (error, results) => {
                if (error) {
                throw error
                }
                db.query("INSERT INTO positions (name) VALUES ('Store'),('Office')", (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            })
        })
      
        db.query('DROP TABLE IF EXISTS users CASCADE',(error, results) => {
            if (error) {
                throw error
            }
    
            db.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname VARCHAR(100), lastname VARCHAR(100), email VARCHAR(100))', (error, results) => {
                if (error) {
                throw error
                }
                db.query("INSERT INTO users (firstname, lastname, email) VALUES ('Oleksii','Glavatyi','alexgl2004@gmail.com'),('Oleg','Petrovich','oleg@guck.com')", (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            })
        })

      response.status(200).send('Base generated');

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error (get Actions)');
    }

}
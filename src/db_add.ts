import { db } from './db'

export function dbGenerate(){
    db.exec('CREATE TABLE actions (id INTEGER PRIMARY KEY ASC, name VARCHAR(30))')
    db.exec('INSERT INTO actions VALUES (1,"Move Item"),(2,"View Item"),(3,"Delete Item"),(4,"Create Item")')

    db.exec('CREATE TABLE actions_user (id INTEGER PRIMARY KEY ASC, user_id INTEGER, action_id INTEGER)')
    db.exec('INSERT INTO actions_user VALUES (1, 1, 1),(2, 1, 2),(3, 1, 3),(4, 1, 4),(5, 2, 1),(6, 2, 4)')

    db.exec('CREATE TABLE items (id INTEGER PRIMARY KEY ASC, name VARCHAR(100), text VARCHAR(200), user_id INTEGER, position_id INTEGER, last_changed_by_id INTEGER)')
    db.exec('INSERT INTO items VALUES (1,"Chairs","",1,1,1),(2,"Tables","",2,1,2)')

    db.exec('CREATE TABLE positions (id INTEGER PRIMARY KEY ASC, name VARCHAR(30))')
    db.exec('INSERT INTO positions VALUES (1,"Store"),(2,"Office")')

    db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY ASC, firstname VARCHAR(100), lastname VARCHAR(100), email VARCHAR(100))')
    db.exec('INSERT INTO users VALUES (1,"Oleksii","Glavatyi","alexgl2004@gmail.com"),(2,"Oleg","Petrovich","oleg@guck.com")')

    db.each('SELECT * FROM actions', (err, row:any) => {
        console.log(`${row.id}, ${row.name}`)
    })
}
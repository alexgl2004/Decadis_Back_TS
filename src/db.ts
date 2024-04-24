import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export const db = new sqlite3.Database(':memory:')
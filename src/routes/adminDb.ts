import { Router } from "express";
import { 
    resetDb
 } from "../handlers/adminDb";


const router : Router = Router();

console.log('aaa')

router.get("/", resetDb);

export default router;
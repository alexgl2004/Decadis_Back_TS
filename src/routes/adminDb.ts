import { Router } from "express";
import { 
    resetDatabase
 } from "../handlers/adminDb";


const router : Router = Router();


router.get("/", resetDatabase);


export default router;
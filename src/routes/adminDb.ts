import { Router } from "express";
import { 
    resetDb
 } from "../handlers/adminDb";


const router : Router = Router();

router.get("/", resetDb);

export default router;
import { Router } from "express";
import { 
    getIndex,
 } from "../handlers/index";


const router : Router = Router();

router.get("/", getIndex);


export default router;
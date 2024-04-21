import { Router } from "express";
import { 
    getActions,
    getUserAction
 } from "../handlers/actions";


const router : Router = Router();

router.get("/", getActions);
router.get("/user/:id", getUserAction);

export default router;
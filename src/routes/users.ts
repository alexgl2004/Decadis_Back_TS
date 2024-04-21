import { Router } from "express";
import { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deteleUser
 } from "../handlers/users";


const router : Router = Router();

router.get("/:id/delete", deteleUser);
router.post("/:id/edit", updateUser);
router.post("/add", createUser);
router.get("/:id", getUser);
router.get("/", getUsers);


export default router;
import { Router } from "express";
import { 
    getItemsPositions,
    deleteItem,
    moveItem,
    createItem,
    getItem,
    getItems
 } from "../handlers/items";

const router : Router = Router();

router.get("/positions", getItemsPositions);
router.post("/:id/delete", deleteItem);
router.post("/:id/move", moveItem);
router.post("/add", createItem);
router.post("/:id", getItem);
router.get("/", getItems);


export default router;
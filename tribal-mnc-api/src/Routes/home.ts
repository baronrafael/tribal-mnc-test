import { Router } from "express";
import HomeController from "../Controllers/HomeController";

const router = Router();
//Login route
router.get("/:type/:text/", HomeController.index);

export default router;
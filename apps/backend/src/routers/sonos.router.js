import { Router } from "express";
import SonosController from "../controllers/sonos.controller.js";

const sonosRouter = Router();

const sonosController = new SonosController();

sonosRouter.get("/discover", sonosController.discover);
sonosRouter.post("/control", sonosController.control);

export default sonosRouter;
import express from "express";
import { addMaps,fetchAllMaps } from "../controllers/mapController.js";

const mapRouter = express.Router()

mapRouter.post('/add',addMaps)
mapRouter.get('/list',fetchAllMaps)

export default mapRouter
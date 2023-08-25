import express from "express";
import {addArtistData, deleteArtist, getArtistsData, updateArtistData} from "./controller.js";

export const router = express.Router();

router.get("/artists", getArtistsData);
router.post("/artists", addArtistData);
router.put("/artists/:id", updateArtistData);
router.delete("/artists/:id", deleteArtist);
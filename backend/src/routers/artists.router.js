/* ========== IMPORTS ========== */
// artist route handlers //
import {
	addArtist,
	deleteArtist,
	getArtistsData,
	getSpecificArtist,
	updateArtistData
} from "../controllers/artists.controller.js";

import express from "express";

// Express router to define and handle routes. //
export const artistsRouter = express.Router();

/* ========== ROUTES ========== */
// Define and map routes to controller functions using HTTP methods. //

/* ----- GET ALL ARTISTS ----- */
artistsRouter.get("/", getArtistsData);

/* ----- GET SPECIFIC ARTIST BY ID ----- */
artistsRouter.get("/:id", getSpecificArtist);

/* ----- ADD NEW ARTIST ----- */
artistsRouter.post("/", addArtist);

/* ----- UPDATE ARTIST BY ID ----- */
artistsRouter.put("/:id", updateArtistData);

/* ----- DELETE ARTIST BY ID ----- */
artistsRouter.delete("/:id", deleteArtist);
/* ========== IMPORTS ========== */
// artist route handlers //
import {
	addArtist, addFavorite,
	deleteArtist,
	getArtistsData,
	getSpecificArtist,
	updateArtistData
} from "../controllers/artists.controller.js";

import express from "express";

// Express router to define and handle routes. //
export const router = express.Router();

/* ========== ROUTES ========== */
// Define and map routes to controller functions using HTTP methods. //

/* ----- GET ALL ARTISTS ----- */
router.get("/:type(artists|favorites)", getArtistsData);

/* ----- GET SPECIFIC ARTIST BY ID ----- */
router.get("/:type(artists|favorites)/:id", getSpecificArtist);

/* ----- ADD NEW ARTIST ----- */
router.post("/artists", addArtist);
router.post("/favorites", addFavorite);

/* ----- UPDATE ARTIST BY ID ----- */
router.put("/:type(artists|favorites)/:id", updateArtistData);

/* ----- DELETE ARTIST BY ID ----- */
router.delete("/:type(artists|favorites)/:id", deleteArtist);
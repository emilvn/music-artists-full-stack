/* ========== IMPORTS ========== */
// controller functions from "./controller.js".//
import {
	addArtistData, addFavorite,
	deleteArtist,
	getArtistsData,
	getFavoritesData,
	getSpecificArtist, removeFromFavorites,
	updateArtistData
} from "./controller.js";

import express from "express";

// Express router to define and handle routes. //
export const router = express.Router();

/* ========== ROUTES ========== */
// Define and map routes to controller functions using HTTP methods. //

/* ----- GET ALL ARTISTS ----- */
router.get("/artists", getArtistsData);

/* ----- GET SPECIFIC ARTIST BY ID ----- */
router.get("/artists/:id", getSpecificArtist);

/* ----- ADD NEW ARTIST ----- */
router.post("/artists", addArtistData);

/* ----- UPDATE ARTIST BY ID ----- */
router.put("/artists/:id", updateArtistData);

/* ----- DELETE ARTIST BY ID ----- */
router.delete("/artists/:id", deleteArtist);

/* ----- GET ALL FAVORITE ARTISTS ----- */
router.get("/favorites", getFavoritesData);

/* ----- ADD TO FAVORITES ----- */
router.post("/favorites", addFavorite);

/* ----- REMOVE FROM FAVORITES BY ID ----- */
router.delete("/favorites/:id", removeFromFavorites);
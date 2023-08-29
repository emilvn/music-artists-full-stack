import {
	addArtistData, addFavorite,
	deleteArtist,
	getArtistsData,
	getFavoritesData,
	getSpecificArtist, removeFromFavorites,
	updateArtistData
} from "./controller.js";
import express from "express";

export const router = express.Router();

router.get("/artists", getArtistsData);
router.get("/artists/:id", getSpecificArtist);
router.post("/artists", addArtistData);
router.put("/artists/:id", updateArtistData);
router.delete("/artists/:id", deleteArtist);
router.get("/favorites", getFavoritesData);
router.post("/favorites", addFavorite);
router.delete("/favorites/:id", removeFromFavorites);
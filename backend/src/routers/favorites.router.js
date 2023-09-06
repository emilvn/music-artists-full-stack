/* ========== IMPORTS ========== */
// favorites route handlers //
import express from "express";
import {
	addFavorite,
	getFavoritesData,
	getSpecificFavorite,
	removeFavorite
} from "../controllers/favorites.controller.js";

// Express router to define and handle routes. //
export const favoritesRouter = express.Router();

/* ========== ROUTES ========== */
// Define and map routes to controller functions using HTTP methods. //

/* ----- GET ALL ARTISTS ----- */
favoritesRouter.get("/", getFavoritesData);

/* ----- GET SPECIFIC ARTIST BY ID ----- */
favoritesRouter.get("/:id", getSpecificFavorite);

/* ----- ADD NEW ARTIST ----- */
favoritesRouter.post("/", addFavorite);

/* ----- DELETE ARTIST BY ID ----- */
favoritesRouter.delete("/:id", removeFavorite);
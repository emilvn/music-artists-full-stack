/* ========== IMPORTS ========== */
// favorites route handlers //
import express from "express";
import {
	addFavorite,
	getFavoritesData,
	getSpecificFavorite,
	removeFavorite
} from "../controllers/favorites.controller.js";

/**
 * Express router for favorites routes
 */
export const favoritesRouter = express.Router();

/**
 * Route to get favorite artists
 * @name GET /favorites
 * @function
 */
favoritesRouter.get("/", getFavoritesData);

/**
 * Route to get specific favorite artist by id
 * @name GET /favorites/:id
 * @function
 */
favoritesRouter.get("/:id", getSpecificFavorite);

/**
 * Route to add an artist to favorites
 * @name POST /favorites
 * @function
 */
favoritesRouter.post("/", addFavorite);

/**
 * Route to get remove specific artist by id
 * @name DELETE /favorites/:id
 * @function
 */
favoritesRouter.delete("/:id", removeFavorite);
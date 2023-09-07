import express from "express";
import {addFavorite, getFavorites, removeFavorite} from "../controllers/favorites.controller.js";

/**
 * Express router for favorites routes
 */
export const favoritesRouter = express.Router();

/**
 * Route to get favorite artists
 * @name GET /favorites
 * @function
 */
favoritesRouter.get("/", getFavorites);

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
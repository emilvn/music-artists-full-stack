import {
	addArtist,
	deleteArtist,
	getArtistsData,
	getSpecificArtist,
	updateArtistData
} from "../controllers/artists.controller.js";
import express from "express";

/**
 * Express router for artists routes
 */
export const artistsRouter = express.Router();

/**
 * Route to get list of all artists
 * @name GET /artists
 * @function
 */
artistsRouter.get("/", getArtistsData);

/**
 * Route to get specific artist by id
 * @name GET /artists/:id
 * @function
 */
artistsRouter.get("/:id", getSpecificArtist);

/**
 * Route to add an artist
 * @name POST /artists
 * @function
 */
artistsRouter.post("/", addArtist);

/**
 * Route to update a specific artist by id
 * @name PUT /artists/:id
 * @function
 */
artistsRouter.put("/:id", updateArtistData);

/**
 * Route to delete a specific artist by id
 * @name DELETE /artists/:id
 * @function
 */
artistsRouter.delete("/:id", deleteArtist);
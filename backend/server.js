import express from "express";
import morgan from "morgan";
import {artistsRouter} from "./src/routers/artists.router.js";
import cors from "cors";
import {errorHandler} from "./src/middleware/errorhandler.js";
import {favoritesRouter} from "./src/routers/favorites.router.js";

/**
 * instance of express application
 */
const app = express();

/**
 * Port for server to listen on
 * @type {number}
 */
const port = 3333;

/**
 * Middleware setup
 */

// Parse incoming json data
app.use(express.json());

// use morgan for request logging
app.use(morgan("tiny"));

// use CORS to allow all cross-origin requests
app.use(cors());

/**
 * Define routes
 */
// use artistRouter from src/routers/artist.router.js for artists
app.use("/artists/", artistsRouter);

//use favoritesRouter from src/routers/favorites.router.js for favorites
app.use("/favorites/", favoritesRouter);

/**
 * Error handling middleware
 * @middleware
 */
app.use(errorHandler);

/**
 * start Express server
 */
app.listen(port, ()=>{
	console.log(`Server running on http://localhost:${port}`);
});
/* ========== IMPORTS ========== */
import express from "express";
import morgan from "morgan";
import {router} from "./src/routers/artists.router.js";
import cors from "cors";
import {errorHandler} from "./src/middlewares/errorhandler.js";

/* ========== EXPRESS ========== */
// instance of an Express application. //
const app = express();

// Port for server to listen on //
const port = 3333;

/* ========== MIDDLEWARE SETUP ========== */

// Parse incoming JSON data. //
app.use(express.json());

// Use morgan middleware for request logging. //
app.use(morgan("tiny"));

// Enable CORS to allow cross-origin requests. //
app.use(cors());

// Use the router defined in "./artists.controller.js" //
app.use("/", router);

// use custom error handler middleware //
app.use(errorHandler);

/* ========== START SERVER ========== */

// Start the Express server and listen on the defined port. //
app.listen(port, ()=>{
	console.log(`Server running on http://localhost:${port}`);
});
/* ========== IMPORTS ========== */
import express from "express";
import {router} from "./router.js";
import cors from "cors";

/* ========== EXPRESS ========== */
// instance of an Express application. //
const app = express();

// Port for server to listen on //
const port = 3333;

/* ========== MIDDLEWARE SETUP ========== */

// Parse incoming JSON data. //
app.use(express.json());

// Enable CORS to allow cross-origin requests. //
app.use(cors());

/* ========== ROUTER SETUP ========== */

// Use the router defined in "./router.js" //
app.use("/", router);

/* ========== START SERVER ========== */

// Start the Express server and listen on the defined port. //
app.listen(port, ()=>{
	console.log(`app  running on http://localhost:${port}`);
});
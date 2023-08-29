import express from "express";
import cors from "cors";
import {
	addArtistData,
	addFavorite,
	deleteArtist,
	getArtistsData,
	getFavoritesData, getSpecificArtist, removeFromFavorites,
	updateArtistData
} from "./controller.js";
import {router} from "./router.js";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, ()=>{
	console.log(`app  running on http://localhost:${port}`);
});
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

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
	console.log(`app  running on http://localhost:${port}`);
});

app.get("/artists", getArtistsData);
app.get("/artists/:id", getSpecificArtist);
app.post("/artists", addArtistData);
app.put("/artists/:id", updateArtistData);
app.delete("/artists/:id", deleteArtist);
app.get("/artists/favorites", getFavoritesData);
app.post("/artists/favorites", addFavorite);
app.delete("/artists/favorites/:id", removeFromFavorites);
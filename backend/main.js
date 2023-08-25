import express from "express";
import cors from "cors";
import {addArtistData, deleteArtist, getArtistsData, updateArtistData} from "./controller.js";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
	console.log(`app  running on http://localhost:${port}`);
});

app.get("/artists", getArtistsData);
app.post("/artists", addArtistData);
app.put("/artists/:id", updateArtistData);
app.delete("/artists/:id", deleteArtist);
import express from "express";
import {router} from "./router.js";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
	console.log(`app  running on http://localhost:${port}`);
});

app.use(router);
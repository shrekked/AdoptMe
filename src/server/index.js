import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors({ origin: true }));

const port = 3000;

app.get("/api", async (req, res) => {
	const token = await fetchToken();
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify(token));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const fetchToken = async () => {
	const postData = {
		grant_type: "client_credentials",
		client_id: process.env.PETFINDER_API_KEY,
		client_secret: process.env.PETFINDER_SECRET_KEY,
	};

	const res = await fetch(`https://api.petfinder.com/v2/oauth2/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
	});

	if (!res.ok) {
		throw new Error(`error fetching auth token ${res}`);
	}
	return res.json();
};

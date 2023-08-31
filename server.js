const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const postData = {
	grant_type: "client_credentials",
	client_id: process.env.PETFINDER_API_KEY,
	client_secret: process.env.PETFINDER_SECRET_KEY,
};

app.get("/jwt", async (req, res) => {
	fetch(`https://api.petfinder.com/v2/oauth2/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
	})
		.then((response) => {
			// console.log(response.json());
			return response.json();
		})
		.then((data) => {
			res.json(data);
			console.log({ data });
			return res;
		})
		.catch((error) => {
			console.warn(error);
		});

	// if (!response.ok) {
	// 	return "error fetching auth token";
	// 	// throw new Error(`error fetching auth token`);
	// }
	// const body = await response.text();
	// console.log(body);
	// res = await response;
	// console.log(res);
	// return res;
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

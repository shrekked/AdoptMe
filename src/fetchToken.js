// import { useContext } from "react";
// import TokenContext from "./TokenContext";

async function fetchToken({ queryKey }) {
	const { token } = queryKey[1];
	console.log("test");

	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const contextToken = useContext(TokenContext);
	const sessionToken = window.sessionStorage.getItem("petfinder-token");
	if (sessionToken) {
		return { access_token: sessionToken };
	}

	const postData = {
		grant_type: "client_credentials",
		client_id: import.meta.env.VITE_PETFINDER_API_KEY,
		client_secret: import.meta.env.VITE_PETFINDER_SECRET_KEY,
	};

	const res = await fetch(`https://api.petfinder.com/v2/oauth2/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
	});

	if (!res.ok) {
		throw new Error(`error fetching auth token ${token}`);
	}

	return res.json();
}

export default fetchToken;

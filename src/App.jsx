import { useState, useEffect, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
import "remixicon/fonts/remixicon.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60,
			cacheTime: 1000 * 60 * 60,
		},
	},
});

// const fetchToken = async () => {
// 	const sessionToken = window.sessionStorage.getItem("petfinder-token");
// 	if (sessionToken) {
// 		return {
// 			access_token: sessionToken,
// 			token_type: "Bearer",
// 			expires_in: 3600,
// 		};
// 	}

// 	const postData = {
// 		grant_type: "client_credentials",
// 		client_id: import.meta.env.VITE_PETFINDER_API_KEY,
// 		client_secret: import.meta.env.VITE_PETFINDER_SECRET_KEY,
// 	};

// 	const res = await fetch(`https://api.petfinder.com/v2/oauth2/token`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(postData),
// 	});

// 	if (!res.ok) {
// 		throw new Error(`error fetching auth token`);
// 	}
// 	return res.json();
// };

const fetchToken = async () => {
	const sessionToken = window.sessionStorage.getItem("petfinder-token");
	if (sessionToken) {
		return {
			access_token: sessionToken,
			token_type: "Bearer",
			expires_in: 3600,
		};
	}

	const res = await fetch(`http://localhost:3001/jwt`);

	if (!res.ok) {
		throw new Error(`error fetching auth token`);
	}
	return res.json();
};

const App = () => {
	const adoptedPet = useState(null);
	const [auth, setAuth] = useState({});
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		fetchToken()
			.then((auth) => {
				setAuth(auth);
			})
			.catch((error) => {
				throw new Error(`error resolving auth promise ${error}`);
			});
	}, []);

	if (auth?.access_token && !window.sessionStorage.getItem("petfinder-token")) {
		window.sessionStorage.setItem("petfinder-token", auth.access_token);
		forceUpdate();
	}

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AdoptedPetContext.Provider value={adoptedPet}>
					<header>
						<Link to="/">Adopt me!</Link>
					</header>

					<Routes>
						<Route path="/details/:id" element={<Details />} auth={auth} />
						<Route path="/" element={<SearchParams />} auth={auth} />
					</Routes>
				</AdoptedPetContext.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

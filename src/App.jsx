import { useState, useEffect } from "react";
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

const fetchToken = async () => {
	const sessionToken = window.sessionStorage.getItem("petfinder-token");
	if (sessionToken) {
		return {
			access_token: sessionToken,
			token_type: "Bearer",
			expires_in: 3600,
		};
	}

	const res = await fetch("http://localhost:3000/api", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error(`error fetching auth token`);
	}
	return res.json();
};

const App = () => {
	const adoptedPet = useState(null);
	const [auth, setAuth] = useState({});

	const [token, setToken] = useState("");

	useEffect(() => {
		fetchToken()
			.then((auth) => {
				setAuth(auth);
			})
			.catch((error) => {
				throw new Error(`error resolving auth promise ${error}`);
			});
	}, []);

	if (!window.sessionStorage.getItem("petfinder-token") && auth?.access_token) {
		window.sessionStorage.setItem("petfinder-token", auth.access_token);
		setToken(auth.access_token);
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
						<Route path="/" element={<SearchParams token={token} />} />
						<Route path="/api" element={<SearchParams token={token} />} />
					</Routes>
				</AdoptedPetContext.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

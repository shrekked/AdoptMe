import { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 60,
			cacheTime: 1000 * 60 * 60,
		},
	},
});

const App = () => {
	const adoptedPet = useState(null);

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AdoptedPetContext.Provider value={adoptedPet}>
					<header>
						<Link to="/">Adopt me!</Link>
					</header>

					<Routes>
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</AdoptedPetContext.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
// import TokenContext from "./TokenContext";
import Results from "./Results";
import fetchSearch from "./fetchSearch.js";
import fetchToken from "./fetchToken.js";
import useBreeds from "./useBreeds.js";
// import TokenContext from "./TokenContext.js";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		location: "",
		animal: "",
		breed: "",
	});

	const [animal, setAnimal] = useState("");
	const [breeds] = useBreeds(animal);
	const [adoptedPet] = useContext(AdoptedPetContext);

	const results = useQuery(["search", requestParams], fetchSearch);
	const pets = results?.data?.animals ?? [];
	console.log({ adoptedPet });
	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					const obj = {
						animal: formData.get("animal") ?? "",
						breed: formData.get("breed") ?? "",
						location: formData.get("location") ?? "",
					};
					setRequestParams(obj);
					console.log({ requestParams }, { obj });
				}}
			>
				{adoptedPet ? (
					<>
						<div className="pet image-container">
							<img src={adoptedPet.images[0]} alt={adoptedPet.name} />
						</div>
						<h2 className="pet-name">{adoptedPet.name}</h2>
					</>
				) : null}
				<label htmlFor="location">
					Location
					<input id="location" name="location" placeholder="Location" />
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={animal}
						name="animal"
						onChange={(e) => {
							setAnimal(e.target.value);
						}}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
				</label>
				<label htmlFor="animal">
					Breed
					<select id="breed" disabled={breeds.length === 0} name="breed">
						<option />
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

const SearchWrapper = () => {
	const authToken = useQuery(["token", ""], fetchToken);
	const token = authToken?.data?.access_token;
	if (token) {
		window.sessionStorage.setItem("petfinder-token", token);
	}
	return (
		token && (
			<div>
				<SearchParams token={token} />
			</div>
		)
	);
};

export default SearchWrapper;

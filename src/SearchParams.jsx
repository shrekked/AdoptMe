import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./scripts/fetchSearch.js";
import fetchAnimalTypes from "./scripts/fetchAnimalTypes.js";
import useBreeds from "./scripts/useBreeds.js";
import Results from "./Results";
import Pagination from "./Pagination";

const SearchParams = () => {
	const [animal, setAnimal] = useState("");
	const [requestParams, setRequestParams] = useState({
		location: "",
		animal: "",
		breed: "",
		page: 1,
	});

	const [breeds] = useBreeds(animal);
	const [adoptedPet] = useContext(AdoptedPetContext);

	const { data, isLoading } = useQuery(["search", requestParams], fetchSearch);
	// const results = useQuery(["search", requestParams], fetchSearch);
	const animalTypeData = useQuery(["searchAnimalTypes", ""], fetchAnimalTypes);

	const types = animalTypeData?.data?.types ?? [];
	const ANIMALS = types.map((type) => {
		return type.name;
	});

	const pets = data?.animals ?? [];
	const pagination = data?.pagination ?? {};

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
				<div>
					<label htmlFor="location">
						Location
						<input
							id="location"
							name="location"
							placeholder="Search by City and State, or Zip Code"
						/>
					</label>
				</div>
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
			<Results pets={pets} isLoading={isLoading} />

			<Pagination
				pagination={pagination}
				requestParams={requestParams}
				setRequestParams={setRequestParams}
			/>
		</div>
	);
};

export default SearchParams;

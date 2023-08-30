import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

function useBreeds(animal) {
	const results = useQuery(["breeds", animal], fetchBreedList);
	const breeds = results?.data?.breeds?.map((breed) => breed.name);

	return [breeds ?? [], results.status];
}

export default useBreeds;

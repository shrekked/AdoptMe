async function fetchSearch({ queryKey }) {
	const { animal, location, breed, page } = queryKey[1];
	const token = window.sessionStorage.getItem("petfinder-token") || "";

	const res = await fetch(
		`https://api.petfinder.com/v2/animals?${
			page ? `page=${encodeURIComponent(page)}` : "page=1"
		}${
			location ? `&location=${encodeURIComponent(location)}&distance=25` : ""
		}${breed ? `&breed=${encodeURIComponent(breed)}` : ""}${
			animal ? `&type=${encodeURIComponent(animal)}` : ""
		}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!res.ok) {
		throw new Error(`pet search not okay ${animal}, ${location}, ${breed}`);
	}
	return res.json();
}

export default fetchSearch;

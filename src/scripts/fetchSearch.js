async function fetchSearch({ queryKey }) {
	const { animal, location, breed, page } = queryKey[1];
	const token = window.sessionStorage.getItem("petfinder-token") || "";
	// console.log("fetch token", token, queryKey);
	if (!token) return [];

	try {
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

		return res.json();
	} catch {
		throw new Error(`pet search not okay ${animal}, ${location}, ${breed}`);
	}
}

export default fetchSearch;

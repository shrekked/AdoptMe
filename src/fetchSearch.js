async function fetchSearch({ queryKey }) {
	const { animal, location, breed } = queryKey[1];
	console.log({ animal });
	const token = window.sessionStorage.getItem("petfinder-token") || "";
	if (token) {
		const res = await fetch(
			`https://api.petfinder.com/v2/animals?${
				location ? `location=${location}&distance=25` : ""
			}${breed ? `&breed=${breed}` : ""}${animal ? `&type=${animal}` : ""}`,
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

	return {};
}

export default fetchSearch;

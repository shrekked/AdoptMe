const fetchBreedList = async ({ queryKey }) => {
	const animal = queryKey[1];

	if (!animal) return [];

	const token = window.sessionStorage.getItem("petfinder-token") || "";

	const apiRes = await fetch(
		`https://api.petfinder.com/v2/types/${animal.toLowerCase()}/breeds`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!apiRes.ok) {
		throw new Error(`An error has occured: ${apiRes.status}`);
	}

	return apiRes.json();
};

export default fetchBreedList;

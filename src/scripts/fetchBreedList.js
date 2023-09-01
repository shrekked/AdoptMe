const fetchBreedList = async ({ queryKey }) => {
	const animal = queryKey[1];
	const token = window.sessionStorage.getItem("petfinder-token") || "";

	if (!animal || !token) return [];

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

const fetchPet = async ({ queryKey }) => {
	const id = queryKey[1];

	const token = window.sessionStorage.getItem("petfinder-token") || "";
	if (!token || !id) return [];

	const apiRes = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!apiRes.ok) {
		throw new Error(`An error has occured: ${apiRes.status}`);
	}

	return apiRes.json();
};

export default fetchPet;

const fetchAnimalTypes = async () => {
	const token = window.sessionStorage.getItem("petfinder-token") || "";

	const apiRes = await fetch(`https://api.petfinder.com/v2/types`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!apiRes.ok) {
		throw new Error(`An error has occured: ${apiRes.status}`);
	}

	return apiRes.json();
};

export default fetchAnimalTypes;

const fetchOrg = async ({ queryKey }) => {
	const id = queryKey[1];

	const token = window.sessionStorage.getItem("petfinder-token") || "";

	const apiRes = await fetch(
		`https://api.petfinder.com/v2/organizations/${id}`,
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

export default fetchOrg;

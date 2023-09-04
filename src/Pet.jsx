import { Link } from "react-router-dom";

const Pet = (props) => {
	const { name, type, breeds, images, photos, id, status, location, distance } =
		props;

	let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
	if (images?.length) {
		hero = images[0].medium;
	}
	if (photos?.length) {
		hero = photos[0].medium;
	}

	return (
		<Link to={`/details/${id}`} className="relative block bg-slate-100 py-4 px-8 shadow-md">
			<div className="max-w-full w-auto h-auto">
				<img src={hero} alt={name} className="w-auto h-full mb-4 mx-auto"  />
			</div>
			<div className="block text-center">
				<h1>{name}</h1>
				<h2>
					{type} - {breeds?.primary} - {status}
				</h2>
				<h2>
					{location} {distance ? `- ${Math.floor(distance)} miles away` : ""}
				</h2>
			</div>
		</Link>
	);
};

export default Pet;

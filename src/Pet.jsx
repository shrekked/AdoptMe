import { Link } from "react-router-dom";

const Pet = (props) => {
	const { name, type, breeds, images, photos, id, status } = props;

	let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
	if (images?.length) {
		hero = images[0].small;
	}
	if (photos?.length) {
		hero = photos[0].small;
	}

	return (
		<Link to={`/details/${id}`} className="pet">
			<div className="image-container">
				<img src={hero} alt={name} />
			</div>
			<div className="info">
				<h1>{name}</h1>
				<h2>
					{type} - {breeds?.primary} - {status}
				</h2>
			</div>
		</Link>
	);
};

export default Pet;

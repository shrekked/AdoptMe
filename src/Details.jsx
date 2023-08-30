import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPet from "./scripts/fetchPet";
// import fetchOrg from "./scripts/fetchOrg";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
	const { id } = useParams();
	// const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);
	const [showModal, setShowModal] = useState(false);
	const results = useQuery(["details", id], fetchPet);

	const pet = results?.data?.animal;
	// const orgID = pet?.organization_id;

	// const organizationData = useQuery({
	// 	queryKey: ["organization", orgID],
	// 	queryFn: fetchOrg,
	// 	enabled: !!orgID,
	// });
	// const organization = organizationData?.data?.organization ?? {};
	// console.log({ organization });

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">
					<i className="ri-loop-right-line"></i>
				</h2>
			</div>
		);
	}

	const defaultImages = [
		{
			small: "http://pets-images.dev-apis.com/pets/none.jpg",
			medium: "http://pets-images.dev-apis.com/pets/none.jpg",
			large: "http://pets-images.dev-apis.com/pets/none.jpg",
		},
	];
	if (!pet.photos || pet.photos.length == 0) {
		pet.photos = defaultImages;
	}

	return (
		<div className="details">
			<Carousel images={pet.photos} />
			<div>
				<h1 className="pet-name__title">
					{pet.name}{" "}
					<span className="pet-name__info">
						{pet?.breeds?.primary} {pet?.breeds?.mixed ? " Mix" : ""} *{" "}
						{pet?.contact?.address?.city} - {pet?.contact?.address?.state}
					</span>
				</h1>
			</div>
			<div>
				<h2> About</h2>
				<h3>
					{/* {pet.animal} - {pet.breeds.primary} - {pet.address.city} - {pet.state} */}
				</h3>
				<button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
				<p>{pet.description}</p>

				{showModal ? (
					<Modal>
						<div>
							<h1>Would you like to adopt {pet.name}?</h1>
							<div className="buttons">
								<button
									onClick={() => {
										setAdoptedPet(pet);
										window.open(pet.url, "_blank");
									}}
								>
									Yes
								</button>
								<button onClick={() => setShowModal(false)}>No</button>
							</div>
						</div>
					</Modal>
				) : null}
			</div>
		</div>
	);
};

function DetailsErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	);
}

export default DetailsErrorBoundary;

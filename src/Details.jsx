import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);
	const [showModal, setShowModal] = useState(false);
	const results = useQuery(["details", id], fetchPet);

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🍥</h2>
			</div>
		);
	}

	console.log({ results });
	const pet = results.data.animal;

	return (
		<div className="details">
			<Carousel images={pet.photos} />
			<div>
				<h1>{pet.name}</h1>
				<h2>
					{pet.animal} - {pet.breed} - {pet.city} - {pet.state}
				</h2>
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
										navigate("/");
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

import { useState, useContext, useEffect } from "react";
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

	const pet = results?.data?.animal || {};

	useEffect(() => {
		function keyListener(e) {
			const listener = keyListenersMap.get(e.keyCode);
			return listener && listener(e);
		}
		document.addEventListener("keydown", keyListener);

		return () => document.removeEventListener("keydown", keyListener);
	});

	const defaultImages = [
		{
			small: "http://pets-images.dev-apis.com/pets/none.jpg",
			medium: "http://pets-images.dev-apis.com/pets/none.jpg",
			large: "http://pets-images.dev-apis.com/pets/none.jpg",
		},
	];

	if (!pet?.photos || pet?.photos?.length == 0) {
		pet.photos = defaultImages;
	}

	const closeModal = () => {
		setShowModal(false);
	};

	const handleModalOpen = () => {
		setShowModal(true);
		window.setTimeout(() => {
			const yesButton = document.querySelector(
				"#modal .buttons .modal_button_yes"
			);
			yesButton.focus();
		});
	};

	const handleTabKey = (e) => {
		if (!showModal) return;
		const modal = document.querySelector("#modal");
		const focusableModalElements = modal.querySelectorAll(
			'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
		);
		const firstElement = focusableModalElements[0];
		const lastElement =
			focusableModalElements[focusableModalElements.length - 1];

		if (!e.shiftKey && document.activeElement !== firstElement) {
			firstElement.focus();
			return e.preventDefault();
		}

		if (e.shiftKey && document.activeElement !== lastElement) {
			lastElement.focus();
			e.preventDefault();
		}
	};
	const keyListenersMap = new Map([
		[27, closeModal],
		[9, handleTabKey],
	]);

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">
					<i className="ri-loop-right-line"></i>
				</h2>
			</div>
		);
	}

	return (
		<div className="details">
			<Carousel images={pet.photos} />
			<div className="pet--info">
				<h1 className="pet-name__title">{pet.name} </h1>
				<div className="pet--about__info">
					{pet?.species} <i className="ri-circle-fill"></i>{" "}
					{pet?.breeds?.primary} <i className="ri-circle-fill"></i>{" "}
					{pet?.contact?.address?.city} <i className="ri-circle-fill"></i>{" "}
					{pet?.contact?.address?.state}
				</div>

				<hr></hr>
				<div className="pet--about__info">
					{pet.age} <i className="ri-circle-fill"></i> {pet.gender}{" "}
					<i className="ri-circle-fill"></i> {pet.size}{" "}
					<i className="ri-circle-fill"></i> {pet?.colors?.primary}
				</div>
				<hr></hr>

				{(pet?.environment?.cats ||
					pet?.environment?.dogs ||
					pet?.environment?.children ||
					pet?.coat) && (
					<>
						<h2 className="details-about"> About</h2>
						{pet.coat && (
							<div className="pet--about__info details--coatlength">
								<h4>Coat Length: </h4>
								{pet.coat}
							</div>
						)}
						<div className="pet--about__info details--environment">
							<h4>Good in a home with: </h4>
							{Object.entries(pet.environment).map(([key, value], i) =>
								value
									? `${key[0].toUpperCase() + key.slice(1, key.length)}${
											i < Object.entries(pet.environment).length - 1 ? "," : ""
									  } `
									: ""
							)}
						</div>
					</>
				)}
				<button onClick={(e) => handleModalOpen(e)}>Adopt {pet.name}</button>

				{showModal ? (
					<Modal>
						<div>
							<h1>View more info about {pet.name}?</h1>
							<div className="buttons">
								<button
									className="modal_button_yes"
									onClick={() => {
										setAdoptedPet(pet);
										window.open(pet.url, "_blank");
									}}
								>
									Yes
								</button>
								<button
									className="modal_button_no"
									onClick={() => closeModal()}
								>
									No
								</button>
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

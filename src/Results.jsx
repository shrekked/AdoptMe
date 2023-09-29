import Pet from "./Pet";

const Results = ({ pets, isLoading }) => {
	if (isLoading) {
		<div className="loading-pane">
			<h2 className="loader">
				<i className="ri-loop-right-line"></i>
			</h2>
		</div>;
	}
	return (
		<>
			{!pets.length ? (
				<>
					<h1>No Pets Found</h1>
					<div className="loading-pane">
						<h2 className="loader">
							<i className="ri-loop-right-line"></i>
						</h2>
					</div>
				</>
			) : (
				pets.map((pet) => (
					<Pet
						{...pet}
						animal={pet.animal}
						breed={pet.breed}
						id={pet.id}
						name={pet.name}
						images={pet.photos}
						location={`${pet.contact?.address?.city}, ${pet.contact?.address?.state}`}
						key={pet.id}
						distance={pet.distance}
					/>
				))
			)}
		</>
	);
};

export default Results;

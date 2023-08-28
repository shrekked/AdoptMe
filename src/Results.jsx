import Pet from "./Pet";

const Results = ({ pets }) => {
	console.log({ pets });
	return (
		<div className="search">
			{!pets.length ? (
				<h1>No Pets Found</h1>
			) : (
				pets.map((pet) => (
					<Pet
						{...pet}
						animal={pet.animal}
						breed={pet.breed}
						id={pet.id}
						name={pet.name}
						images={pet.photos}
						location={`${pet.city}, ${pet.state}`}
						key={pet.id}
					/>
				))
			)}
		</div>
	);
};

export default Results;

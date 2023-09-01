import { Component } from "react";

class Carousel extends Component {
	state = {
		active: 0,
	};

	handleIndexClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			active: +e.target.dataset.index,
		});
	};

	render() {
		const { active } = this.state;
		const { images } = this.props;

		return (
			<>
				<div className="carousel">
					<img src={images[active].large} alt="animal hero" />
					<div className="carousel-smaller">
						{images.map((photo, index) => (
							<button
								className="image-btns"
								key={index}
								onClick={this.handleIndexClick}
								data-index={index}
							>
								<img
									src={photo.small}
									className={index === active ? "active" : ""}
									alt="animal thumbnail"
									data-index={index}
								/>
							</button>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default Carousel;

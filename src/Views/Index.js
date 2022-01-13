import React, { useState } from "react";
import "./Index.css";

const Index = () => {
	const [clicked, setClicked] = useState(-1);
	const [elements, setElements] = useState([
		{ id: 0, type: "square", side: "left", order: 0 },
		{ id: 1, type: "circle", side: "right", order: 1 },
		{ id: 2, type: "circle", side: "right", order: 2 },
	]);

	const [newPosition, setNewPosition] = useState(-100);

	const [data, setData] = useState();

	const handleDragStart = (event, element) => {
		event.dataTransfer.setData("text/plain", String(element.id));
		setClicked(element.id);
	};

	const dragged = (event, side) => {
		let id = event.dataTransfer.getData("text");
		let elems = elements.map((elem) => {
			if (elem.id == id) {
				elem.side = side;
				elem.order = newPosition > -100 ? newPosition : elements.length;
			}
			return elem;
		});
		elems.sort((a, b) => {
			return a.order - b.order;
		});
		setNewPosition(-100);
		console.log(elems, id);
		event.dataTransfer.clearData("text");
		setClicked(-1);
		setElements(elems);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDragOverElement = (event, element) => {
		let id = clicked;
		console.log(id, id == element.id, element.id);
		if (id == element.id) return;
		const elementY = event.target.getBoundingClientRect().y;
		const height = event.target.getBoundingClientRect().height;
		const mouseY = event.clientY;
		setNewPosition(
			elementY + height / 2 >= mouseY
				? element.order - 1
				: element.order + 1
		);
	};

	const rightys = elements.filter((elem) => {
		return elem.side === "right";
	});
	const leftys = elements.filter((elem) => {
		return elem.side === "left";
	});

	const rightSide = rightys.map((elem, index) => {
		return (
			<div
				onDragStart={(event) => {
					handleDragStart(event, elem);
				}}
				onDragOver={(e) => handleDragOverElement(e, elem)}
				draggable
				key={`right-${index}`}
				className={`${elem.type} ${elem.clicked ? "clicked" : null}`}
			></div>
		);
	});
	const leftSide = leftys.map((elem, index) => {
		return (
			<div
				onDragStart={(event) => {
					handleDragStart(event, elem);
				}}
				onDragOver={(e) => handleDragOverElement(e, elem)}
				draggable
				key={index}
				className={`${elem.type} ${elem.clicked ? "clicked" : null}`}
			></div>
		);
	});

	return (
		<div className="main-container">
			<div
				id="left"
				className="first-container column"
				onDragOver={(e) => handleDragOver(e)}
				onDrop={(event) => {
					dragged(event, "left");
				}}
			>
				{leftSide}
			</div>
			<div
				id="right"
				className="second-container column"
				onDragOver={(e) => handleDragOver(e)}
				onDrop={(event) => {
					dragged(event, "right");
				}}
			>
				{rightSide}
			</div>
		</div>
	);
};

export default Index;

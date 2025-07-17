"use client";

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import checkBoxesFit from './BoxLogic';
import Box from './Box';

const InputForm = ({ setValidPlacementBoxes }) => {
	const [inputs, setInputs] = useState({
		'A': { width: '', height: '' },
		'B': { width: '', height: '' },
		'C': { width: '', height: '' },
		perimeter: { width: '', height: '' },
	});
	const [spacing, setSpacing] = useState(1);

	const handleChange = (e, box, field) => {
		setInputs(prev => ({
			...prev,
			[box]: {
				...prev[box],
				[field]: e.target.value,
			},
		}));
	};

	const handleSpacingChange = (e) => {
		setSpacing(e.target.value);
	};
	const validateInputs = () => {
		// Validate all inputs are numbers
		const allInputs = [
			inputs.A.width, inputs.A.height,
			inputs.B.width, inputs.B.height,
			inputs.C.width, inputs.C.height,
			inputs.perimeter.width, inputs.perimeter.height,
			spacing
		];

		const hasInvalid = allInputs.some(val => isNaN(Number(val)) || val === '' || Number(val) <= 0);
		if (hasInvalid) {
			alert('Please enter valid numbers for all fields.');
			return false;
		}
		return true;
	}

	const handleGenerate = () => {
		let inputsValid = validateInputs();
		if (!inputsValid) return;

		const boxes = {
			'A': new Box(Number(inputs.A.width), Number(inputs.A.height)),
			'B': new Box(Number(inputs.B.width), Number(inputs.B.height)),
			'C': new Box(Number(inputs.C.width), Number(inputs.C.height)),
		};
		const perimeter = new Box(Number(inputs.perimeter.width), Number(inputs.perimeter.height));

		const result = checkBoxesFit(boxes, perimeter, Number(spacing));
		console.log('Placement found:', result);
		// access setValidPlacement and setValidPlacementBoxes from props
		setValidPlacementBoxes(result);
		// setValidPlacement(true);
	};

	return (
		<Form style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
			{['A', 'B', 'C', 'perimeter'].map(box => (
				<Form.Group as={Row} className="mb-3" key={box}>
					<Form.Label column sm={2}>
						<b>{(box.length == 1) ? 'Box ' + box : box.replace('perimeter', 'Perimeter')}</b>
					</Form.Label>
					<Col sm={5}>
						<Form.Control
							type="number"
							placeholder="Width (feet)"
							value={inputs[box].width}
							onChange={e => handleChange(e, box, 'width')}
						/>
					</Col>
					<Col sm={5}>
						<Form.Control
							type="number"
							placeholder="Height (feet)"
							value={inputs[box].height}
							onChange={e => handleChange(e, box, 'height')}
						/>
					</Col>
				</Form.Group>
			))}
			<Form.Group as={Row} className="mb-3">
				<Form.Label column sm={2}><b>Spacing</b></Form.Label>
				<div style={{ width: '49%', marginBottom: '20px' }}>

					<Col sm={10}>
						<Form.Control
							type="number"
							placeholder="Spacing (feet)"
							value={spacing}
							onChange={handleSpacingChange}
							min={0}
						/>
					</Col>
				</div>

			</Form.Group>

			<div style={{ textAlign: 'center'}}>
				<Button variant="primary" type="button" style={{ alignContent: 'center' }} onClick={handleGenerate}>
					Generate
				</Button>
			</div>
		</Form>
	);
};

export default InputForm;